const Axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

const serverUrl = process.env.ELASTIC_APM_SERVER_URL;
const domain = process.env.DOMAIN || "khouryofficehours.com";
const service_name = `${domain.replace(/\./g, "-")}-frontend`;
const service_version = process.env.SERVICE_VERSION
const token = process.env.ELASTIC_APM_SECRET_TOKEN;

async function main() {
  console.log("Uploading sourcemaps!");
  const chunkFolder = path.join(__dirname, "../.next/static/chunks");
  if (!token) {
    throw new Error("no elastic apm sourcemap api key");
  }

  const filenames = await fs.promises.readdir(chunkFolder);
  const dotJs = filenames.filter(
    (f) => f.endsWith(".js") && filenames.includes(`${f}.map`)
  );
  await Promise.all(
    dotJs.map(async (filename) => {
      const filepath = path.join(chunkFolder, filename);
      const mappath = `${filepath}.map`;
      const mapping = JSON.parse(await fs.promises.readFile(mappath));
      if (mapping.mappings) {
        const formData = new FormData();
        formData.append("sourcemap", fs.createReadStream(mappath));
        formData.append("service_version", service_version);
        formData.append(
          "bundle_filepath",
          `https://${domain}/_next/static/chunks/${filename}`
        );
        formData.append("service_name", service_name);
        try {
          await Axios.post(`${serverUrl}/assets/v1/sourcemaps`, formData, {
            headers: {
              ...formData.getHeaders(),
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (e) {
          console.log("error on map ", mappath, e, " formdata:", formData);
        }
      }
    })
  );
}

main()
  .then(() => console.log("Sourcemaps uploaded!"))
  .catch((err) => console.log("Error while uploading sourcemaps!", err));
