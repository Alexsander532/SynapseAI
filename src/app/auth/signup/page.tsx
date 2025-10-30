"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Phone, Chrome, CheckCircle } from "lucide-react";
import Link from "next/link";
import { apiClient } from "@/lib/api";
import { SignupRequest } from "@/types/auth";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Form validation schema
const signupSchema = z.object({
  username: z
    .string()
    .min(1, "Nome de usuário é obrigatório")
    .min(3, "Nome de usuário deve ter pelo menos 3 caracteres")
    .max(20, "Nome de usuário deve ter no máximo 20 caracteres")
    .regex(/^[a-zA-Z0-9_]+$/, "Nome de usuário pode conter apenas letras, números e underscore"),
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Por favor, insira um email válido"),
  whatsapp: z
    .string()
    .min(1, "WhatsApp é obrigatório")
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "WhatsApp deve estar no formato (xx) xxxxx-xxxx"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número"),
  confirmPassword: z
    .string()
    .min(1, "Confirmação de senha é obrigatória"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

// Function to format WhatsApp number
const formatWhatsApp = (value: string) => {
  // Remove all non-numeric characters
  const numbers = value.replace(/\D/g, '');
  
  // Apply the mask (xx) xxxxx-xxxx
  if (numbers.length <= 2) {
    return numbers;
  } else if (numbers.length <= 7) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  } else {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  }
};

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAccountCreated, setIsAccountCreated] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  // Watch WhatsApp field for mask
  const whatsappValue = watch("whatsapp");

  // Mock signup function
  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Signup data:", data);
    setIsAccountCreated(true);
    setIsLoading(false);
  };

  // Mock Google signup function
  const handleGoogleSignup = async () => {
    setIsLoading(true);
    // Simulate Google OAuth
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Google signup initiated");
    setIsLoading(false);
  };

  if (isAccountCreated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 text-center pb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="flex justify-center mb-4"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
              </motion.div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                Conta criada com sucesso!
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400 mt-2">
                Bem-vindo ao Synapse AI, <br />
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {getValues("username")}
                </span>
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-center space-y-4"
              >
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Sua conta foi criada com sucesso! Agora você pode fazer login e começar sua jornada acadêmica.
                </p>
                
                <Link href="/auth/signin">
                  <Button className="w-full h-11 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 transition-colors">
                    Fazer login
                  </Button>
                </Link>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center pb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                Criar conta no Synapse AI
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400 mt-2">
                Comece sua jornada acadêmica hoje mesmo
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Google Signup Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <Button
                variant="outline"
                className="w-full h-11 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                onClick={handleGoogleSignup}
                disabled={isLoading}
              >
                <Chrome className="mr-2 h-4 w-4" />
                Continuar com Google
              </Button>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="relative"
            >
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white dark:bg-slate-900 px-2 text-xs text-slate-500 dark:text-slate-400">
                  ou crie com email
                </span>
              </div>
            </motion.div>

            {/* Signup Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Nome de usuário
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Digite seu nome de usuário"
                    className={`pl-10 h-11 border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 ${
                      errors.username ? "border-red-500 focus:border-red-500" : ""
                    }`}
                    {...register("username")}
                  />
                </div>
                {errors.username && (
                  <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Digite seu email"
                    className={`pl-10 h-11 border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 ${
                      errors.email ? "border-red-500 focus:border-red-500" : ""
                    }`}
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* WhatsApp Field */}
              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  WhatsApp
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="whatsapp"
                    type="tel"
                    placeholder="(xx) xxxxx-xxxx"
                    value={whatsappValue || ""}
                    onChange={(e) => {
                      const formatted = formatWhatsApp(e.target.value);
                      setValue("whatsapp", formatted);
                    }}
                    className={`pl-10 h-11 border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 ${
                      errors.whatsapp ? "border-red-500 focus:border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.whatsapp && (
                  <p className="text-sm text-red-500 mt-1">{errors.whatsapp.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    className={`pl-10 pr-10 h-11 border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 ${
                      errors.password ? "border-red-500 focus:border-red-500" : ""
                    }`}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Confirmar senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirme sua senha"
                    className={`pl-10 pr-10 h-11 border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 ${
                      errors.confirmPassword ? "border-red-500 focus:border-red-500" : ""
                    }`}
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-11 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white dark:border-slate-900 border-t-transparent rounded-full"
                  />
                ) : (
                  "Criar conta"
                )}
              </Button>
            </motion.form>

            {/* Sign In Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="text-center pt-4"
            >
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Já tem uma conta?{" "}
                <Link
                  href="/auth/signin"
                  className="font-medium text-slate-900 dark:text-slate-100 hover:underline transition-colors"
                >
                  Fazer login
                </Link>
              </p>
            </motion.div>
          </CardContent>
        </Card>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Ao criar uma conta, você concorda com nossos{" "}
            <Link href="/terms" className="hover:underline">
              Termos de Serviço
            </Link>{" "}
            e{" "}
            <Link href="/privacy" className="hover:underline">
              Política de Privacidade
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}