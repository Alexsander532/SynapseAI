"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Download, 
  Upload, 
  Search, 
  Filter, 
  Folder, 
  File, 
  Plus,
  Calendar,
  User,
  Eye
} from "lucide-react";

export default function RepositorioPage() {
  const arquivos = [
    {
      id: 1,
      nome: "Apostila_Calculo_I.pdf",
      tipo: "pdf",
      tamanho: "2.5 MB",
      materia: "Matemática",
      categoria: "apostila",
      dataUpload: "2024-01-15",
      autor: "Prof. João Silva",
      downloads: 45
    },
    {
      id: 2,
      nome: "Lista_Exercicios_Programacao.docx",
      tipo: "docx",
      tamanho: "1.2 MB",
      materia: "Programação",
      categoria: "exercicios",
      dataUpload: "2024-01-20",
      autor: "Profa. Maria Santos",
      downloads: 32
    },
    {
      id: 3,
      nome: "Projeto_Final_React.zip",
      tipo: "zip",
      tamanho: "15.8 MB",
      materia: "Programação Web",
      categoria: "projeto",
      dataUpload: "2024-02-01",
      autor: "Você",
      downloads: 8
    },
    {
      id: 4,
      nome: "Resumo_Historia_Contemporanea.pdf",
      tipo: "pdf",
      tamanho: "3.1 MB",
      materia: "História",
      categoria: "resumo",
      dataUpload: "2024-02-05",
      autor: "Ana Costa",
      downloads: 23
    },
    {
      id: 5,
      nome: "Slides_Fisica_Quantica.pptx",
      tipo: "pptx",
      tamanho: "8.7 MB",
      materia: "Física",
      categoria: "slides",
      dataUpload: "2024-02-10",
      autor: "Dr. Carlos Oliveira",
      downloads: 67
    }
  ];

  const categorias = [
    { nome: "Apostilas", count: 12, cor: "bg-blue-100 text-blue-800" },
    { nome: "Exercícios", count: 8, cor: "bg-green-100 text-green-800" },
    { nome: "Projetos", count: 5, cor: "bg-purple-100 text-purple-800" },
    { nome: "Resumos", count: 15, cor: "bg-orange-100 text-orange-800" },
    { nome: "Slides", count: 20, cor: "bg-pink-100 text-pink-800" }
  ];

  const getFileIcon = (tipo: string) => {
    switch (tipo) {
      case "pdf": return <FileText className="h-5 w-5 text-red-500" />;
      case "docx": return <FileText className="h-5 w-5 text-blue-500" />;
      case "pptx": return <FileText className="h-5 w-5 text-orange-500" />;
      case "zip": return <Folder className="h-5 w-5 text-gray-500" />;
      default: return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case "apostila": return "bg-blue-100 text-blue-800";
      case "exercicios": return "bg-green-100 text-green-800";
      case "projeto": return "bg-purple-100 text-purple-800";
      case "resumo": return "bg-orange-100 text-orange-800";
      case "slides": return "bg-pink-100 text-pink-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Repositório</h1>
            <p className="text-gray-600 mt-1">Gerencie seus arquivos e materiais de estudo</p>
          </div>
          <Button className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Arquivo
          </Button>
        </div>

        {/* Filtros e Busca */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar arquivos..."
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total de Arquivos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{arquivos.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Espaço Usado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">31.3 MB</div>
              <div className="text-sm text-gray-500">de 1 GB</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Downloads Totais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">175</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Arquivos Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">3</div>
              <div className="text-sm text-gray-500">últimos 7 dias</div>
            </CardContent>
          </Card>
        </div>

        {/* Categorias */}
        <Card>
          <CardHeader>
            <CardTitle>Categorias</CardTitle>
            <CardDescription>Organize seus arquivos por categoria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {categorias.map((categoria, index) => (
                <div key={index} className="text-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="text-2xl font-bold text-gray-700">{categoria.count}</div>
                  <Badge className={categoria.cor}>{categoria.nome}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lista de Arquivos */}
        <Card>
          <CardHeader>
            <CardTitle>Arquivos Recentes</CardTitle>
            <CardDescription>Seus arquivos mais recentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {arquivos.map((arquivo) => (
                <div key={arquivo.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    {getFileIcon(arquivo.tipo)}
                    <div>
                      <div className="font-medium">{arquivo.nome}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-4">
                        <span>{arquivo.tamanho}</span>
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {arquivo.autor}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(arquivo.dataUpload).toLocaleDateString('pt-BR')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          {arquivo.downloads} downloads
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getCategoriaColor(arquivo.categoria)}>
                      {arquivo.categoria}
                    </Badge>
                    <Badge variant="outline">
                      {arquivo.materia}
                    </Badge>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        Visualizar
                      </Button>
                      <Button size="sm" className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upload Zone */}
        <Card>
          <CardHeader>
            <CardTitle>Upload de Arquivos</CardTitle>
            <CardDescription>Arraste e solte arquivos aqui ou clique para selecionar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Clique para fazer upload ou arraste arquivos aqui</p>
              <p className="text-sm text-gray-500">Suporta: PDF, DOC, DOCX, PPT, PPTX, ZIP (máx. 50MB)</p>
              <Button className="mt-4">
                Selecionar Arquivos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}