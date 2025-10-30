"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Users, Clock, Plus, Search, Filter, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function MateriasPage() {
  const materias = [
    {
      id: 1,
      nome: "Matemática Avançada",
      codigo: "MAT301",
      professor: "Dr. João Silva",
      creditos: 4,
      cargaHoraria: 60,
      progresso: 75,
      status: "em_andamento",
      proximaAula: "2024-02-15T14:00:00",
      nota: 8.2
    },
    {
      id: 2,
      nome: "Programação Web",
      codigo: "INF205",
      professor: "Profa. Maria Santos",
      creditos: 6,
      cargaHoraria: 90,
      progresso: 60,
      status: "em_andamento",
      proximaAula: "2024-02-16T09:00:00",
      nota: 9.1
    },
    {
      id: 3,
      nome: "História Contemporânea",
      codigo: "HIS102",
      professor: "Dr. Carlos Oliveira",
      creditos: 3,
      cargaHoraria: 45,
      progresso: 100,
      status: "concluida",
      nota: 7.8
    },
    {
      id: 4,
      nome: "Física Quântica",
      codigo: "FIS401",
      professor: "Dra. Ana Costa",
      creditos: 5,
      cargaHoraria: 75,
      progresso: 30,
      status: "em_andamento",
      proximaAula: "2024-02-17T16:00:00",
      nota: 8.5
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "em_andamento": return "bg-blue-100 text-blue-800";
      case "concluida": return "bg-green-100 text-green-800";
      case "pausada": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressColor = (progresso: number) => {
    if (progresso >= 80) return "bg-green-500";
    if (progresso >= 60) return "bg-blue-500";
    if (progresso >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

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
          className="flex justify-between items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold text-gray-900">Matérias</h1>
            <p className="text-gray-600 mt-1">Acompanhe o progresso das suas disciplinas</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nova Matéria
            </Button>
          </motion.div>
        </motion.div>

        {/* Filtros e Busca */}
        <motion.div 
          className="flex gap-4 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div 
            className="relative flex-1 max-w-md"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar matérias..."
              className="pl-10"
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
          </motion.div>
        </motion.div>

        {/* Estatísticas Rápidas */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {[
            { title: "Total de Matérias", value: "4", color: "text-blue-600" },
            { title: "Em Andamento", value: "3", color: "text-orange-600" },
            { title: "Concluídas", value: "1", color: "text-green-600" },
            { title: "Média Geral", value: "8.4", color: "text-purple-600" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.6 + (index * 0.1),
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div 
                    className={`text-2xl font-bold ${stat.color}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.8 + (index * 0.1),
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    {stat.value}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Lista de Matérias */}
        <motion.div 
          className="grid gap-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          {materias.map((materia, index) => (
            <motion.div
              key={materia.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 1.1 + (index * 0.1),
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.02,
                y: -3,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <motion.div 
                        className="flex items-center gap-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 + (index * 0.1) }}
                      >
                        <CardTitle className="text-lg">{materia.nome}</CardTitle>
                        <Badge variant="outline">{materia.codigo}</Badge>
                        <Badge className={getStatusColor(materia.status)}>
                          {materia.status === "em_andamento" ? "Em Andamento" : 
                           materia.status === "concluida" ? "Concluída" : "Pausada"}
                        </Badge>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3 + (index * 0.1) }}
                      >
                        <CardDescription className="flex items-center gap-4">
                          <motion.span 
                            className="flex items-center gap-1"
                            whileHover={{ x: 2 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Users className="h-4 w-4" />
                            {materia.professor}
                          </motion.span>
                          <motion.span 
                            className="flex items-center gap-1"
                            whileHover={{ x: 2 }}
                            transition={{ duration: 0.2 }}
                          >
                            <BookOpen className="h-4 w-4" />
                            {materia.creditos} créditos
                          </motion.span>
                          <motion.span 
                            className="flex items-center gap-1"
                            whileHover={{ x: 2 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Clock className="h-4 w-4" />
                            {materia.cargaHoraria}h
                          </motion.span>
                        </CardDescription>
                      </motion.div>
                    </div>
                    <motion.div 
                      className="text-right"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: 1.4 + (index * 0.1),
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="text-2xl font-bold text-green-600">{materia.nota}</div>
                      <div className="text-sm text-gray-500">Nota</div>
                    </motion.div>
                  </div>
                </CardHeader>
                <CardContent>
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 + (index * 0.1) }}
                  >
                    {/* Progresso */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso do Curso</span>
                        <span>{materia.progresso}%</span>
                      </div>
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ 
                          duration: 0.8, 
                          delay: 1.6 + (index * 0.1),
                          ease: "easeOut"
                        }}
                        style={{ transformOrigin: "left" }}
                      >
                        <Progress value={materia.progresso} className="h-2" />
                      </motion.div>
                    </div>

                    {/* Próxima Aula */}
                    {materia.proximaAula && (
                      <motion.div 
                        className="flex items-center justify-between text-sm text-gray-600"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.7 + (index * 0.1) }}
                      >
                        <span>Próxima aula:</span>
                        <span>{new Date(materia.proximaAula).toLocaleString('pt-BR')}</span>
                      </motion.div>
                    )}

                    {/* Ações */}
                    <motion.div 
                      className="flex gap-2 pt-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.8 + (index * 0.1) }}
                    >
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          Material
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4" />
                          Notas
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button size="sm">
                          Ver Detalhes
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}