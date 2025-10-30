"use client";

import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, BookOpen, Clock, CheckCircle, Circle, AlertCircle } from "lucide-react";

interface Materia {
  nome: string;
  codigo: string;
  creditos: number;
  status: "concluida" | "em_andamento" | "pendente";
  nota?: number;
}

interface Semestre {
  numero: number;
  periodo: string;
  materias: Materia[];
}

export default function GradePage() {
  const semestres: Semestre[] = [
    {
      numero: 1,
      periodo: "2023.1",
      materias: [
        { nome: "Cálculo I", codigo: "MAT101", creditos: 4, status: "concluida", nota: 8.5 },
        { nome: "Programação I", codigo: "INF101", creditos: 4, status: "concluida", nota: 9.2 },
        { nome: "Física I", codigo: "FIS101", creditos: 4, status: "concluida", nota: 7.8 },
        { nome: "Inglês Técnico", codigo: "LET101", creditos: 2, status: "concluida", nota: 8.0 }
      ]
    },
    {
      numero: 2,
      periodo: "2023.2",
      materias: [
        { nome: "Cálculo II", codigo: "MAT102", creditos: 4, status: "concluida", nota: 8.8 },
        { nome: "Programação II", codigo: "INF102", creditos: 4, status: "concluida", nota: 9.0 },
        { nome: "Física II", codigo: "FIS102", creditos: 4, status: "concluida", nota: 8.2 },
        { nome: "Estatística", codigo: "MAT201", creditos: 3, status: "concluida", nota: 7.5 }
      ]
    },
    {
      numero: 3,
      periodo: "2024.1",
      materias: [
        { nome: "Estruturas de Dados", codigo: "INF201", creditos: 4, status: "em_andamento", nota: 8.5 },
        { nome: "Banco de Dados", codigo: "INF202", creditos: 4, status: "em_andamento", nota: 9.1 },
        { nome: "Engenharia de Software", codigo: "INF203", creditos: 4, status: "em_andamento", nota: 8.7 },
        { nome: "Redes de Computadores", codigo: "INF204", creditos: 3, status: "em_andamento", nota: 8.0 }
      ]
    },
    {
      numero: 4,
      periodo: "2024.2",
      materias: [
        { nome: "Algoritmos Avançados", codigo: "INF301", creditos: 4, status: "pendente" },
        { nome: "Sistemas Operacionais", codigo: "INF302", creditos: 4, status: "pendente" },
        { nome: "Inteligência Artificial", codigo: "INF303", creditos: 4, status: "pendente" },
        { nome: "Projeto de Software", codigo: "INF304", creditos: 3, status: "pendente" }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "concluida": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "em_andamento": return <Circle className="h-4 w-4 text-blue-600" />;
      case "pendente": return <AlertCircle className="h-4 w-4 text-gray-400" />;
      default: return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "concluida": return "bg-green-100 text-green-800";
      case "em_andamento": return "bg-blue-100 text-blue-800";
      case "pendente": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "concluida": return "Concluída";
      case "em_andamento": return "Em Andamento";
      case "pendente": return "Pendente";
      default: return "Pendente";
    }
  };

  const totalCreditos = semestres.reduce((acc, sem) => 
    acc + sem.materias.reduce((acc2, mat) => acc2 + mat.creditos, 0), 0
  );

  const creditosConcluidos = semestres.reduce((acc, sem) => 
    acc + sem.materias.filter(mat => mat.status === "concluida").reduce((acc2, mat) => acc2 + mat.creditos, 0), 0
  );

  const creditosAndamento = semestres.reduce((acc, sem) => 
    acc + sem.materias.filter(mat => mat.status === "em_andamento").reduce((acc2, mat) => acc2 + mat.creditos, 0), 0
  );

  const progressoGeral = (creditosConcluidos / totalCreditos) * 100;

  const mediaGeral = semestres.reduce((acc, sem) => {
    const materiasComNota = sem.materias.filter((mat): mat is Materia & { nota: number } => 
      mat.nota !== undefined
    );
    const somaNotas = materiasComNota.reduce((acc2, mat) => acc2 + mat.nota, 0);
    return acc + somaNotas;
  }, 0) / semestres.reduce((acc, sem) => 
    acc + sem.materias.filter(mat => mat.nota !== undefined).length, 0
  );

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
            <h1 className="text-3xl font-bold text-gray-900">Grade Curricular</h1>
            <p className="text-gray-600 mt-1">Acompanhe seu progresso acadêmico</p>
          </motion.div>
        </motion.div>

        {/* Estatísticas Gerais */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            {
              title: "Progresso Geral",
              value: `${progressoGeral.toFixed(1)}%`,
              color: "text-blue-600",
              extra: <Progress value={progressoGeral} className="mt-2 h-2" />
            },
            {
              title: "Créditos Concluídos",
              value: creditosConcluidos,
              color: "text-green-600",
              extra: <div className="text-sm text-gray-500">de {totalCreditos} créditos</div>
            },
            {
              title: "Em Andamento",
              value: creditosAndamento,
              color: "text-orange-600",
              extra: <div className="text-sm text-gray-500">créditos</div>
            },
            {
              title: "Média Geral",
              value: mediaGeral.toFixed(1),
              color: "text-purple-600",
              extra: null
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.4 + (index * 0.1),
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
                <CardHeader className="pb-2">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                  >
                    <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <motion.div 
                    className={`text-2xl font-bold ${stat.color}`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: 0.6 + (index * 0.1),
                      type: "spring",
                      stiffness: 300
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  {stat.extra && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + (index * 0.1) }}
                    >
                      {stat.extra}
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Grade por Semestre */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {semestres.map((semestre, semestreIndex) => (
            <motion.div
              key={semestre.numero}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.9 + (semestreIndex * 0.2),
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.01,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <motion.div 
                    className="flex items-center justify-between"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 + (semestreIndex * 0.2) }}
                  >
                    <div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.1 + (semestreIndex * 0.2) }}
                      >
                        <CardTitle className="flex items-center gap-2">
                          <motion.div
                            whileHover={{ rotate: 10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Calendar className="h-5 w-5" />
                          </motion.div>
                          {semestre.numero}º Semestre - {semestre.periodo}
                        </CardTitle>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 + (semestreIndex * 0.2) }}
                      >
                        <CardDescription>
                          {semestre.materias.length} matérias • {semestre.materias.reduce((acc, mat) => acc + mat.creditos, 0)} créditos
                        </CardDescription>
                      </motion.div>
                    </div>
                    <motion.div 
                      className="text-right"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: 1.3 + (semestreIndex * 0.2),
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      <div className="text-sm text-gray-500">
                        {semestre.materias.filter(mat => mat.status === "concluida").length} de {semestre.materias.length} concluídas
                      </div>
                    </motion.div>
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <motion.div 
                    className="grid gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 + (semestreIndex * 0.2) }}
                  >
                    {semestre.materias.map((materia, materiaIndex) => (
                      <motion.div 
                        key={materiaIndex} 
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: 1.5 + (semestreIndex * 0.2) + (materiaIndex * 0.1),
                          ease: "easeOut"
                        }}
                        whileHover={{ 
                          scale: 1.02,
                          x: 5,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ 
                              delay: 1.6 + (semestreIndex * 0.2) + (materiaIndex * 0.1),
                              type: "spring",
                              stiffness: 300
                            }}
                            whileHover={{ 
                              rotate: 360,
                              transition: { duration: 0.5 }
                            }}
                          >
                            {getStatusIcon(materia.status)}
                          </motion.div>
                          <div>
                            <motion.div 
                              className="font-medium"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 1.7 + (semestreIndex * 0.2) + (materiaIndex * 0.1) }}
                            >
                              {materia.nome}
                            </motion.div>
                            <motion.div 
                              className="text-sm text-gray-500 flex items-center gap-4"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 1.8 + (semestreIndex * 0.2) + (materiaIndex * 0.1) }}
                            >
                              <motion.span
                                whileHover={{ x: 2 }}
                                transition={{ duration: 0.2 }}
                              >
                                {materia.codigo}
                              </motion.span>
                              <motion.span 
                                className="flex items-center gap-1"
                                whileHover={{ x: 2 }}
                                transition={{ duration: 0.2 }}
                              >
                                <BookOpen className="h-3 w-3" />
                                {materia.creditos} créditos
                              </motion.span>
                            </motion.div>
                          </div>
                        </div>
                        <motion.div 
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.9 + (semestreIndex * 0.2) + (materiaIndex * 0.1) }}
                        >
                          {materia.nota !== undefined && (
                            <motion.div 
                              className="text-right"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ 
                                delay: 2.0 + (semestreIndex * 0.2) + (materiaIndex * 0.1),
                                type: "spring",
                                stiffness: 200
                              }}
                              whileHover={{ 
                                scale: 1.1,
                                transition: { duration: 0.2 }
                              }}
                            >
                              <div className="font-bold text-green-600">{materia.nota}</div>
                              <div className="text-xs text-gray-500">Nota</div>
                            </motion.div>
                          )}
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ 
                              delay: 2.1 + (semestreIndex * 0.2) + (materiaIndex * 0.1),
                              type: "spring",
                              stiffness: 200
                            }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <Badge className={getStatusColor(materia.status)}>
                              {getStatusText(materia.status)}
                            </Badge>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Resumo do Curso */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          whileHover={{ 
            scale: 1.01,
            transition: { duration: 0.2 }
          }}
        >
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6 }}
              >
                <CardTitle>Resumo do Curso</CardTitle>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 }}
              >
                <CardDescription>Bacharelado em Ciência da Computação</CardDescription>
              </motion.div>
            </CardHeader>
            <CardContent>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                {[
                  { value: totalCreditos, label: "Créditos Totais", color: "text-blue-600" },
                  { value: "8", label: "Semestres", color: "text-green-600" },
                  { value: "4 anos", label: "Duração", color: "text-purple-600" }
                ].map((item, index) => (
                  <motion.div 
                    key={item.label}
                    className="text-center p-4 border rounded-lg"
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 1.9 + (index * 0.1),
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <motion.div 
                      className={`text-2xl font-bold ${item.color}`}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: 2.0 + (index * 0.1),
                        type: "spring",
                        stiffness: 300
                      }}
                    >
                      {item.value}
                    </motion.div>
                    <motion.div 
                      className="text-sm text-gray-600"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.1 + (index * 0.1) }}
                    >
                      {item.label}
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}