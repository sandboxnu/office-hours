import Axios from "axios";
import * as fs from "fs";
import * as path from "path";
import * as git from "git-rev-sync";

const serverUrl = process.env.NEXT_PUBLIC_APM_SERVER;
const domain = process.env.DOMAIN || 'https://khouryofficehours.com';

async function main() {
  console.log("Uploading sourcemaps!");
  const chunkFolder = path.join(__dirname, "../.next/static/chunks");
  const service_name = `${domain.replace(/\./g, "-")}-frontend`;

  const service_version = git.long();

  const filenames = await fs.promises.readdir(chunkFolder);
  const dotJs = filenames.filter((f) => f.endsWith(".js") && filenames.includes(`${f}.map`));
  await Promise.all(
    dotJs.map((filename) => {
      const filepath = path.join(chunkFolder, filename);
      const formData = {
        sourcemap: fs.createReadStream(`${filepath}.map`),
        service_version,
        bundle_filepath: `${domain}/_next/static/chunks/${filename}.js`,
        service_name,
      };
      return Axios.post(`${serverUrl}/assets/v1/sourcemaps`, formData);
    })
  );
}

main()
  .then(() => console.log("Sourcemaps uploaded!"))
  .catch((err) => console.log("Error while uploading sourcemaps!", err));
