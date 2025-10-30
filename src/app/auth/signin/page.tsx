"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Chrome } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api";
import { LoginRequest } from "@/types/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Form validation schema
const signinSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Por favor, insira um endereço de email válido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type SigninFormData = z.infer<typeof signinSchema>;

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  /**
   * Função de login que usa o cliente HTTP real
   * Faz requisição para a API (interceptada pelo MSW em desenvolvimento)
   */
  const onSubmit = async (data: SigninFormData) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      console.log("🔐 Iniciando processo de login...");
      
      // Faz a requisição real usando o cliente HTTP
      const response = await apiClient.login(data as LoginRequest);

      if (response.success) {
        console.log("✅ Login realizado com sucesso!");
        //console.log("👤 Usuário:", response.data.data.user);
        
        // Salva o token no localStorage (em um app real, considere usar cookies httpOnly)
        //localStorage.setItem('authToken', response.data.data.token);
        
        // Redireciona para o dashboard
        router.push('/dashboard');
      } else {
        console.log("❌ Erro no login:", response.message);
        setLoginError(response.message);
      }
    } catch (error: any) {
      console.error("❌ Erro inesperado:", error);
      setLoginError(error.message || "Erro inesperado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Função de login com Google (ainda mockada)
   * Em um projeto real, integraria com Google OAuth
   */
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setLoginError(null);
    
    try {
      console.log("🔍 Iniciando login com Google...");
      // Simula delay do Google OAuth
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("✅ Login com Google simulado");
      alert("Login com Google simulado com sucesso!");
    } catch (error) {
      console.error("❌ Erro no login com Google:", error);
      setLoginError("Erro no login com Google. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

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
                Entrar no Synapse AI
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400 mt-2">
                Acesse sua conta para continuar sua jornada acadêmica
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Google Login Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <Button
                variant="outline"
                className="w-full h-11 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                onClick={handleGoogleLogin}
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
                  ou entre com email
                </span>
              </div>
            </motion.div>

            {/* Login Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
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

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                >
                  Esqueceu a senha?
                </Link>
              </div>

              {/* Mock Credentials Helper */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    🚀 Dados para Teste
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      setValue("email", "admin@synapseai.com");
                      setValue("password", "Admin123!");
                    }}
                    className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    Preencher
                  </button>
                </div>
                <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                  <p><strong>Email:</strong> admin@synapseai.com</p>
                  <p><strong>Senha:</strong> Admin123!</p>
                </div>
              </motion.div>

              {/* Login Error Message */}
              {loginError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-3"
                >
                  <p className="text-sm text-red-700 dark:text-red-300 flex items-center">
                    <span className="mr-2">❌</span>
                    {loginError}
                  </p>
                </motion.div>
              )}

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
                  "Entrar"
                )}
              </Button>
            </motion.form>

            {/* Sign Up Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="text-center pt-4"
            >
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Não tem uma conta?{" "}
                <Link
                  href="/auth/signup"
                  className="font-medium text-slate-900 dark:text-slate-100 hover:underline transition-colors"
                >
                  Criar conta
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
            Ao entrar, você concorda com nossos{" "}
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