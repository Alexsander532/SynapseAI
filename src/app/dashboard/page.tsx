"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3,
  Users,
  FileText,
  Calendar,
  TrendingUp,
  BookOpen,
  Clock,
  Award,
  Plus
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/DashboardLayout";
import { apiClient } from "@/lib/api";
import { User as UserType } from "@/types/auth";

export default function DashboardPage() {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await apiClient.getCurrentUser();
        if (userData.success && userData.data) {
          setUser(userData.data.user);
        } else {
          router.push("/auth/signin");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/auth/signin");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
          />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Bem-vindo de volta, {user?.name || 'Usuário'}!
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Atividade
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            {
              title: "Total de Matérias",
              value: "8",
              description: "+2 desde o último semestre",
              icon: BookOpen
            },
            {
              title: "Provas Pendentes", 
              value: "3",
              description: "Próxima em 2 dias",
              icon: FileText
            },
            {
              title: "Média Geral",
              value: "8.7", 
              description: "+0.3 desde o último mês",
              icon: TrendingUp
            },
            {
              title: "Horas de Estudo",
              value: "42h",
              description: "Esta semana", 
              icon: Clock
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.4 + (index * 0.1),
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <motion.div 
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-7"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* Recent Activities */}
          <motion.div
            className="col-span-4"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Atividades Recentes</CardTitle>
                <CardDescription>
                  Suas últimas atividades acadêmicas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Prova de Matemática",
                      subject: "Cálculo I",
                      date: "Hoje, 14:00",
                      status: "pending",
                      type: "exam"
                    },
                    {
                      title: "Entrega do Projeto",
                      subject: "Programação",
                      date: "Amanhã, 23:59",
                      status: "pending",
                      type: "assignment"
                    },
                    {
                      title: "Prova de Física",
                      subject: "Física I",
                      date: "Concluída",
                      status: "completed",
                      type: "exam"
                    },
                    {
                      title: "Seminário",
                      subject: "História",
                      date: "Concluída",
                      status: "completed",
                      type: "presentation"
                    }
                  ].map((activity, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center space-x-4 p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: 0.9 + (index * 0.1),
                        ease: "easeOut"
                      }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div 
                        className={`p-2 rounded-full ${
                          activity.type === 'exam' ? 'bg-red-100 text-red-600' :
                          activity.type === 'assignment' ? 'bg-blue-100 text-blue-600' :
                          'bg-green-100 text-green-600'
                        }`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {activity.type === 'exam' ? <FileText className="h-4 w-4" /> :
                         activity.type === 'assignment' ? <BookOpen className="h-4 w-4" /> :
                         <Users className="h-4 w-4" />}
                      </motion.div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {activity.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {activity.subject}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                          {activity.date}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="col-span-3"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
                <CardDescription>
                  Acesso rápido às funcionalidades principais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { icon: FileText, text: "Nova Avaliação" },
                  { icon: BookOpen, text: "Adicionar Matéria" },
                  { icon: Calendar, text: "Ver Grade Horária" },
                  { icon: BarChart3, text: "Relatório de Notas" }
                ].map((action, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 1.0 + (index * 0.1),
                      ease: "easeOut"
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button className="w-full justify-start" variant="outline">
                      <action.icon className="mr-2 h-4 w-4" />
                      {action.text}
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          whileHover={{ scale: 1.005 }}
        >
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Próximos Eventos</CardTitle>
              <CardDescription>
                Suas próximas atividades acadêmicas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Prova de Cálculo I",
                    date: "15 de Janeiro",
                    time: "14:00",
                    location: "Sala 201"
                  },
                  {
                    title: "Entrega do TCC",
                    date: "20 de Janeiro",
                    time: "23:59",
                    location: "Online"
                  },
                  {
                    title: "Apresentação do Projeto",
                    date: "25 de Janeiro",
                    time: "10:00",
                    location: "Auditório"
                  }
                ].map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 1.5 + (index * 0.1),
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      scale: 1.03,
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Card className="hover:shadow-md transition-all duration-300 border-l-4 border-l-primary">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold">{event.title}</h4>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <motion.div 
                              className="flex items-center"
                              whileHover={{ x: 2 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Calendar className="mr-2 h-3 w-3" />
                              {event.date}
                            </motion.div>
                            <motion.div 
                              className="flex items-center"
                              whileHover={{ x: 2 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Clock className="mr-2 h-3 w-3" />
                              {event.time}
                            </motion.div>
                            <motion.div 
                              className="flex items-center"
                              whileHover={{ x: 2 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Award className="mr-2 h-3 w-3" />
                              {event.location}
                            </motion.div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}