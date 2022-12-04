import { object, string, TypeOf } from "zod";
import { useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../components/FormInput";
import { LoadingButton } from "../components/LoadingButton";
import { toast } from "react-toastify";
import useStore from "../store";
import { authApi } from "../api/authApi";
import { GenericResponse } from "../api/types";

const forgotPasswordchema = object({
  email: string().min(1, "Email is required").email("Invalid email address"),
});

export type ForgotPasswordInput = TypeOf<typeof forgotPasswordchema>;

const ForgotPasswordPage = () => {
  const store = useStore();

  const methods = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const forgotPassword = async (data: ForgotPasswordInput) => {
    try {
      store.setRequestLoading(true);
      const response = await authApi.post<GenericResponse>(
        `auth/forgotpassword`,
        data
      );
      store.setRequestLoading(false);
      toast.success(response.data.message as string, {
        position: "top-right",
      });
    } catch (error: any) {
      store.setRequestLoading(false);
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(resMessage, {
        position: "top-right",
      });
    }
  };

  const onSubmitHandler: SubmitHandler<ForgotPasswordInput> = (values) => {
    forgotPassword(values);
  };
  return (
    <section className="bg-ct-blue-600 min-h-screen grid place-items-center">
      <div className="w-full">
        <h1 className="text-4xl xl:text-6xl text-center font-[600] text-ct-yellow-600 mb-7">
          Forgot Password
        </h1>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5"
          >
            <FormInput label="Email Address" name="email" type="email" />
            <LoadingButton
              loading={store.requestLoading}
              textColor="text-ct-blue-600"
            >
              Send Reset Code
            </LoadingButton>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
