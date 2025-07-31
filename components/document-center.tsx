"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Upload,
  Download,
  Share2,
  Search,
  Filter,
  File,
  ImageIcon,
  Video,
  Archive,
  Eye,
  Star,
  Clock,
  User,
} from "lucide-react"

interface Document {
  id: number
  name: string
  type: "document" | "image" | "video" | "archive" | "other"
  size: string
  uploadedBy: string
  uploadedAt: string
  category: string
  tags: string[]
  isStarred: boolean
  isShared: boolean
  description?: string
  version: string
}

export function DocumentCenter() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [newDocument, setNewDocument] = useState({
    name: "",
    category: "",
    description: "",
    tags: "",
  })

  useEffect(() => {
    // Симуляция загрузки документов
    const mockDocuments: Document[] = [
      {
        id: 1,
        name: "Техническое задание проекта.pdf",
        type: "document",
        size: "2.4 MB",
        uploadedBy: "Елена Козлова",
        uploadedAt: "2024-02-10",
        category: "Проекты",
        tags: ["ТЗ", "проект", "требования"],
        isStarred: true,
        isShared: true,
        description: "Подробное техническое задание для нового проекта",
        version: "v1.2",
      },
      {
        id: 2,
        name: "Дизайн-макеты главной страницы.fig",
        type: "other",
        size: "15.7 MB",
        uploadedBy: "Анна Петрова",
        uploadedAt: "2024-02-12",
        category: "Дизайн",
        tags: ["дизайн", "макеты", "UI"],
        isStarred: false,
        isShared: true,
        description: "Финальные макеты для главной страницы сайта",
        version: "v2.0",
      },
      {
        id: 3,
        name: "Презентация для клиента.pptx",
        type: "document",
        size: "8.3 MB",
        uploadedBy: "Михаил Сидоров",
        uploadedAt: "2024-02-14",
        category: "Презентации",
        tags: ["презентация", "клиент", "демо"],
        isStarred: false,
        isShared: false,
        description: "Презентация функционала для демонстрации клиенту",
        version: "v1.0",
      },
      {
        id: 4,
        name: "Логотип компании.png",
        type: "image",
        size: "156 KB",
        uploadedBy: "Анна Петрова",
        uploadedAt: "2024-02-08",
        category: "Брендинг",
        tags: ["логотип", "брендинг", "PNG"],
        isStarred: true,
        isShared: true,
        description: "Официальный логотип компании в высоком разрешении",
        version: "v3.1",
      },
      {
        id: 5,
        name: "Видео-инструкция по API.mp4",
        type: "video",
        size: "45.2 MB",
        uploadedBy: "Дмитрий Волков",
        uploadedAt: "2024-02-13",
        category: "Документация",
        tags: ["видео", "API", "инструкция"],
        isStarred: false,
        isShared: true,
        description: "Подробная видео-инструкция по работе с API",
        version: "v1.0",
      },
      {
        id: 6,
        name: "Архив исходников.zip",
        type: "archive",
        size: "128 MB",
        uploadedBy: "Михаил Сидоров",
        uploadedAt: "2024-02-11",
        category: "Разработка",
        tags: ["код", "архив", "исходники"],
        isStarred: false,
        isShared: false,
        description: "Архив с исходным кодом проекта",
        version: "v1.5",
      },
    ]
    setDocuments(mockDocuments)
  }, [])

  const handleUploadDocument = () => {
    if (!newDocument.name.trim()) return

    const document: Document = {
      id: Date.now(),
      name: newDocument.name,
      type: "document",
      size: "1.2 MB",
      uploadedBy: localStorage.getItem("username") || "User",
      uploadedAt: new Date().toISOString().split("T")[0],
      category: newDocument.category,
      tags: newDocument.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      isStarred: false,
      isShared: false,
      description: newDocument.description,
      version: "v1.0",
    }

    setDocuments((prev) => [document, ...prev])
    setNewDocument({
      name: "",
      category: "",
      description: "",
      tags: "",
    })
    setIsUploadDialogOpen(false)
  }

  const toggleStar = (id: number) => {
    setDocuments((prev) => prev.map((doc) => (doc.id === id ? { ...doc, isStarred: !doc.isStarred } : doc)))
  }

  const getFileIcon = (type: Document["type"]) => {
    switch (type) {
      case "document":
        return <FileText className="h-8 w-8 text-blue-600" />
      case "image":
        return <ImageIcon className="h-8 w-8 text-green-600" />
      case "video":
        return <Video className="h-8 w-8 text-purple-600" />
      case "archive":
        return <Archive className="h-8 w-8 text-orange-600" />
      default:
        return <File className="h-8 w-8 text-gray-600" />
    }
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["all", ...Array.from(new Set(documents.map((doc) => doc.category)))]
  const starredDocuments = documents.filter((doc) => doc.isStarred)
  const recentDocuments = documents
    .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Центр документов</h2>
          <p className="text-muted-foreground">Управление файлами и документами</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Фильтр
          </Button>
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Загрузить файл
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Загрузить новый документ</DialogTitle>
                <DialogDescription>Добавьте файл в корпоративное хранилище</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fileName">Название файла</Label>
                  <Input
                    id="fileName"
                    value={newDocument.name}
                    onChange={(e) => setNewDocument((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Название документа"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Категория</Label>
                  <Select
                    value={newDocument.category}
                    onValueChange={(value) => setNewDocument((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Проекты">Проекты</SelectItem>
                      <SelectItem value="Дизайн">Дизайн</SelectItem>
                      <SelectItem value="Документация">Документация</SelectItem>
                      <SelectItem value="Презентации">Презентации</SelectItem>
                      <SelectItem value="Брендинг">Брендинг</SelectItem>
                      <SelectItem value="Разработка">Разработка</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Описание</Label>
                  <Textarea
                    id="description"
                    value={newDocument.description}
                    onChange={(e) => setNewDocument((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Краткое описание документа"
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Теги</Label>
                  <Input
                    id="tags"
                    value={newDocument.tags}
                    onChange={(e) => setNewDocument((prev) => ({ ...prev, tags: e.target.value }))}
                    placeholder="Теги через запятую"
                  />
                </div>
                <Button onClick={handleUploadDocument} className="w-full">
                  Загрузить документ
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск документов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все категории</SelectItem>
            {categories.slice(1).map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Все файлы ({filteredDocuments.length})</TabsTrigger>
          <TabsTrigger value="starred">Избранное ({starredDocuments.length})</TabsTrigger>
          <TabsTrigger value="recent">Недавние ({recentDocuments.length})</TabsTrigger>
          <TabsTrigger value="shared">Общие</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDocuments.map((document) => (
              <Card key={document.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(document.type)}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{document.name}</h4>
                        <p className="text-xs text-muted-foreground">{document.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => toggleStar(document.id)}>
                      <Star className={`h-4 w-4 ${document.isStarred ? "fill-yellow-400 text-yellow-400" : ""}`} />
                    </Button>
                  </div>

                  {document.description && (
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{document.description}</p>
                  )}

                  <div className="flex flex-wrap gap-1 mb-3">
                    {document.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {document.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{document.tags.length - 2}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{document.uploadedBy}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(document.uploadedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {document.version}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Share2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="starred">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {starredDocuments.map((document) => (
              <Card key={document.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(document.type)}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{document.name}</h4>
                        <p className="text-xs text-muted-foreground">{document.size}</p>
                      </div>
                    </div>
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{document.uploadedBy}</span>
                    <span>{new Date(document.uploadedAt).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <div className="space-y-3">
            {recentDocuments.map((document) => (
              <Card key={document.id} className="hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    {getFileIcon(document.type)}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{document.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {document.uploadedBy} • {document.size} • {new Date(document.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{document.category}</Badge>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="shared">
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-muted-foreground">
                <Share2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Общие документы</p>
                <p className="text-sm">Файлы, доступные всей команде</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
