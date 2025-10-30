"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText, Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function ProvasPage() {
  const provas = [
    {
      id: 1,
      titulo: "Prova de Matemática - Álgebra Linear",
      materia: "Matemática",
      data: "2024-02-15",
      horario: "14:00",
      duracao: "2h",
      status: "agendada",
      tipo: "presencial"
    },
    {
      id: 2,
      titulo: "Avaliação de Programação - React",
      materia: "Programação",
      data: "2024-02-20",
      horario: "09:00",
      duracao: "3h",
      status: "agendada",
      tipo: "online"
    },
    {
      id: 3,
      titulo: "Prova de História - Século XX",
      materia: "História",
      data: "2024-02-10",
      horario: "16:00",
      duracao: "1h30",
      status: "concluida",
      tipo: "presencial",
      nota: 8.5
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "agendada": return "bg-blue-100 text-blue-800";
      case "concluida": return "bg-green-100 text-green-800";
      case "em_andamento": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTipoColor = (tipo: string) => {
    return tipo === "online" ? "bg-purple-100 text-purple-800" : "bg-orange-100 text-orange-800";
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
            <h1 className="text-3xl font-bold text-gray-900">Provas & Avaliações</h1>
            <p className="text-gray-600 mt-1">Gerencie suas provas e avaliações</p>
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
              Nova Prova
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
              placeholder="Buscar provas..."
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

        {/* Lista de Provas */}
        <motion.div 
          className="grid gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {provas.map((prova, index) => (
            <motion.div
              key={prova.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.6 + (index * 0.1),
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 + (index * 0.1) }}
                      >
                        <CardTitle className="text-lg">{prova.titulo}</CardTitle>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + (index * 0.1) }}
                      >
                        <CardDescription className="flex items-center gap-4">
                          <motion.span 
                            className="flex items-center gap-1"
                            whileHover={{ x: 2 }}
                            transition={{ duration: 0.2 }}
                          >
                            <FileText className="h-4 w-4" />
                            {prova.materia}
                          </motion.span>
                          <motion.span 
                            className="flex items-center gap-1"
                            whileHover={{ x: 2 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Calendar className="h-4 w-4" />
                            {new Date(prova.data).toLocaleDateString('pt-BR')}
                          </motion.span>
                          <motion.span 
                            className="flex items-center gap-1"
                            whileHover={{ x: 2 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Clock className="h-4 w-4" />
                            {prova.horario} ({prova.duracao})
                          </motion.span>
                        </CardDescription>
                      </motion.div>
                    </div>
                    <motion.div 
                      className="flex gap-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: 0.9 + (index * 0.1),
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      <Badge className={getStatusColor(prova.status)}>
                        {prova.status === "agendada" ? "Agendada" : 
                         prova.status === "concluida" ? "Concluída" : "Em Andamento"}
                      </Badge>
                      <Badge className={getTipoColor(prova.tipo)}>
                        {prova.tipo === "online" ? "Online" : "Presencial"}
                      </Badge>
                    </motion.div>
                  </div>
                </CardHeader>
                <CardContent>
                  <motion.div 
                    className="flex justify-between items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 + (index * 0.1) }}
                  >
                    <div className="flex gap-2">
                      {prova.status === "concluida" && prova.nota && (
                        <motion.div 
                          className="text-sm text-gray-600"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ 
                            delay: 1.1 + (index * 0.1),
                            type: "spring",
                            stiffness: 200
                          }}
                        >
                          <span className="font-medium">Nota: </span>
                          <span className="text-green-600 font-bold">{prova.nota}</span>
                        </motion.div>
                      )}
                    </div>
                    <motion.div 
                      className="flex gap-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + (index * 0.1) }}
                    >
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" size="sm">
                          Ver Detalhes
                        </Button>
                      </motion.div>
                      {prova.status === "agendada" && (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button size="sm">
                            Iniciar Prova
                          </Button>
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Estatísticas */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {[
            { 
              title: "Provas Agendadas", 
              value: provas.filter(p => p.status === "agendada").length,
              icon: Calendar,
              color: "text-blue-600"
            },
            { 
              title: "Provas Concluídas", 
              value: provas.filter(p => p.status === "concluida").length,
              icon: Clock,
              color: "text-green-600"
            },
            { 
              title: "Média Geral", 
              value: "8.5",
              icon: FileText,
              color: "text-purple-600"
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.9 + (index * 0.1),
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <motion.div 
                    className="flex items-center justify-between"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 + (index * 0.1) }}
                  >
                    <div>
                      <motion.p 
                        className="text-sm font-medium text-gray-600"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.1 + (index * 0.1) }}
                      >
                        {stat.title}
                      </motion.p>
                      <motion.p 
                        className={`text-2xl font-bold ${stat.color}`}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          delay: 1.2 + (index * 0.1),
                          type: "spring",
                          stiffness: 300
                        }}
                      >
                        {stat.value}
                      </motion.p>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ 
                        delay: 1.3 + (index * 0.1),
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ 
                        rotate: 10,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
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