"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Calendar, User, Flag } from "lucide-react"

interface Task {
  id: number
  title: string
  description: string
  status: "todo" | "in-progress" | "review" | "done"
  priority: "low" | "medium" | "high"
  assignee: string
  dueDate: string
  createdAt: string
}

export function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as const,
    assignee: "",
    dueDate: "",
  })

  // Добавляем состояние для роли пользователя
  const [userRole, setUserRole] = useState("")
  const [currentUser, setCurrentUser] = useState("")

  // В useEffect добавляем получение роли и пользователя
  useEffect(() => {
    const storedRole = localStorage.getItem("user_role") || "employee"
    const storedUser = localStorage.getItem("username") || "User"
    setUserRole(storedRole)
    setCurrentUser(storedUser)

    // Фильтруем задачи в зависимости от роли
    const allTasks: Task[] = [
      {
        id: 1,
        title: "Обновить дизайн главной страницы",
        description: "Необходимо обновить дизайн в соответствии с новым брендбуком",
        status: "in-progress",
        priority: "high",
        assignee: "Анна Петрова",
        dueDate: "2024-02-15",
        createdAt: "2024-02-01",
      },
      {
        id: 2,
        title: "Настроить систему уведомлений",
        description: "Реализовать push-уведомления для мобильного приложения",
        status: "todo",
        priority: "medium",
        assignee: "Михаил Сидоров",
        dueDate: "2024-02-20",
        createdAt: "2024-02-02",
      },
      {
        id: 3,
        title: "Провести тестирование API",
        description: "Полное тестирование всех эндпоинтов API",
        status: "review",
        priority: "high",
        assignee: "Дмитрий Волков",
        dueDate: "2024-02-12",
        createdAt: "2024-01-28",
      },
      {
        id: 4,
        title: "Написать документацию",
        description: "Создать техническую документацию для нового модуля",
        status: "done",
        priority: "low",
        assignee: "Елена Козлова",
        dueDate: "2024-02-10",
        createdAt: "2024-01-25",
      },
      {
        id: 5,
        title: "Оптимизация базы данных",
        description: "Улучшить производительность запросов к БД",
        status: "todo",
        priority: "medium",
        assignee: "Анна Петрова",
        dueDate: "2024-02-25",
        createdAt: "2024-02-03",
      },
    ]

    // Если обычный сотрудник - показываем только его задачи
    const filteredTasks = storedRole === "employee" ? allTasks.filter((task) => task.assignee === storedUser) : allTasks

    setTasks(filteredTasks)
  }, [userRole, currentUser])

  const handleCreateTask = async () => {
    if (!newTask.title.trim()) return

    const task: Task = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      status: "todo",
      priority: newTask.priority,
      assignee: newTask.assignee,
      dueDate: newTask.dueDate,
      createdAt: new Date().toISOString().split("T")[0],
    }

    setTasks((prev) => [...prev, task])
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      assignee: "",
      dueDate: "",
    })
    setIsDialogOpen(false)

    // Симуляция уведомления о новой задаче
    setTimeout(() => {
      alert(`Новая задача "${task.title}" создана и назначена на ${task.assignee}`)
    }, 500)
  }

  const moveTask = (taskId: number, newStatus: Task["status"]) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))

    // Уведомление о смене статуса
    const task = tasks.find((t) => t.id === taskId)
    if (task && newStatus === "done") {
      setTimeout(() => {
        alert(`Задача "${task.title}" выполнена! 🎉`)
      }, 500)
    }
  }

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "todo":
        return "bg-gray-100 text-gray-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "review":
        return "bg-yellow-100 text-yellow-800"
      case "done":
        return "bg-green-100 text-green-800"
    }
  }

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "low":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "high":
        return "text-red-600"
    }
  }

  const columns = [
    { id: "todo", title: "К выполнению", tasks: tasks.filter((t) => t.status === "todo") },
    { id: "in-progress", title: "В работе", tasks: tasks.filter((t) => t.status === "in-progress") },
    { id: "review", title: "На проверке", tasks: tasks.filter((t) => t.status === "review") },
    { id: "done", title: "Выполнено", tasks: tasks.filter((t) => t.status === "done") },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Доска задач</h2>
          <p className="text-muted-foreground">
            {userRole === "employee" ? "Ваши задачи" : "Управление задачами проекта"}
          </p>
        </div>
        {(userRole === "admin" || userRole === "manager") && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Создать задачу
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Создать новую задачу</DialogTitle>
                <DialogDescription>Заполните информацию о новой задаче</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Название задачи</Label>
                  <Input
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Введите название задачи"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Описание</Label>
                  <Textarea
                    id="description"
                    value={newTask.description}
                    onChange={(e) => setNewTask((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Описание задачи"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="priority">Приоритет</Label>
                    <Select
                      value={newTask.priority}
                      onValueChange={(value: any) => setNewTask((prev) => ({ ...prev, priority: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Низкий</SelectItem>
                        <SelectItem value="medium">Средний</SelectItem>
                        <SelectItem value="high">Высокий</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="assignee">Исполнитель</Label>
                    <Input
                      id="assignee"
                      value={newTask.assignee}
                      onChange={(e) => setNewTask((prev) => ({ ...prev, assignee: e.target.value }))}
                      placeholder="Имя исполнителя"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="dueDate">Срок выполнения</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask((prev) => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>
                <Button onClick={handleCreateTask} className="w-full">
                  Создать задачу
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((column) => (
          <div key={column.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{column.title}</h3>
              <Badge variant="secondary">{column.tasks.length}</Badge>
            </div>
            <div className="space-y-3">
              {column.tasks.map((task) => (
                <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-sm">{task.title}</h4>
                        <Flag className={`h-4 w-4 ${getPriorityColor(task.priority)}`} />
                      </div>

                      {task.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
                      )}

                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{task.assignee}</span>
                        </div>
                        {task.dueDate && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex space-x-1">
                        {column.id !== "todo" &&
                          (userRole === "admin" || userRole === "manager" || task.assignee === currentUser) && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs h-6 bg-transparent"
                              onClick={() => {
                                const statuses: Task["status"][] = ["todo", "in-progress", "review", "done"]
                                const currentIndex = statuses.indexOf(task.status)
                                if (currentIndex > 0) {
                                  moveTask(task.id, statuses[currentIndex - 1])
                                }
                              }}
                            >
                              ←
                            </Button>
                          )}
                        {column.id !== "done" &&
                          (userRole === "admin" || userRole === "manager" || task.assignee === currentUser) && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs h-6 bg-transparent"
                              onClick={() => {
                                const statuses: Task["status"][] = ["todo", "in-progress", "review", "done"]
                                const currentIndex = statuses.indexOf(task.status)
                                if (currentIndex < statuses.length - 1) {
                                  moveTask(task.id, statuses[currentIndex + 1])
                                }
                              }}
                            >
                              →
                            </Button>
                          )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
