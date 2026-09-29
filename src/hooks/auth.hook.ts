import { useMutation } from "@tanstack/react-query";
import { login, register, verifyEmail } from "@/api";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmail,
  });
};
