"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle2,
  Clock,
  Calendar,
  Target,
  TrendingUp,
  Award,
  Users,
  MessageSquare,
  BookOpen,
  Coffee,
} from "lucide-react"

interface EmployeeDashboardProps {
  username: string
  userRole: string
}

export function EmployeeDashboard({ username, userRole }: EmployeeDashboardProps) {
  const [personalStats, setPersonalStats] = useState({
    tasksCompleted: 0,
    tasksInProgress: 0,
    efficiency: 0,
    streak: 0,
  })

  const [recentAchievements, setRecentAchievements] = useState<any[]>([])
  const [upcomingDeadlines, setUpcomingDeadlines] = useState<any[]>([])

  useEffect(() => {
    // Симуляция загрузки персональной статистики
    setPersonalStats({
      tasksCompleted: 23,
      tasksInProgress: 4,
      efficiency: 87,
      streak: 5,
    })

    setRecentAchievements([
      {
        id: 1,
        title: "Первая неделя без багов",
        description: "7 дней подряд без критических ошибок",
        icon: Award,
        date: "2024-02-01",
      },
      {
        id: 2,
        title: "Быстрое выполнение",
        description: "Задача выполнена на 2 дня раньше срока",
        icon: Clock,
        date: "2024-01-28",
      },
      {
        id: 3,
        title: "Командный игрок",
        description: "Помощь коллегам в 5 задачах",
        icon: Users,
        date: "2024-01-25",
      },
    ])

    setUpcomingDeadlines([
      {
        id: 1,
        task: "Тестирование нового модуля",
        deadline: "2024-02-15",
        priority: "high",
        progress: 60,
      },
      {
        id: 2,
        task: "Обновление документации",
        deadline: "2024-02-18",
        priority: "medium",
        progress: 30,
      },
      {
        id: 3,
        task: "Код-ревью для команды",
        deadline: "2024-02-20",
        priority: "low",
        progress: 0,
      },
    ])
  }, [])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const motivationalQuotes = [
    "Каждая выполненная задача - шаг к успеху!",
    "Ваша продуктивность вдохновляет команду!",
    "Отличная работа! Продолжайте в том же духе!",
    "Ваш вклад в проект неоценим!",
  ]

  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]

  return (
    <div className="space-y-6">
      {/* Приветствие и мотивация */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">
                {username
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">Добро пожаловать, {username}!</h2>
              <p className="text-muted-foreground mt-1">{randomQuote}</p>
              <div className="flex items-center space-x-4 mt-3">
                <Badge variant="secondary">
                  <Coffee className="mr-1 h-3 w-3" />
                  {userRole === "manager" ? "Менеджер" : "Сотрудник"}
                </Badge>
                <Badge variant="outline">
                  <Target className="mr-1 h-3 w-3" />
                  Эффективность: {personalStats.efficiency}%
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Персональная статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Выполнено задач</p>
                <p className="text-2xl font-bold">{personalStats.tasksCompleted}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">В работе</p>
                <p className="text-2xl font-bold">{personalStats.tasksInProgress}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Эффективность</p>
                <p className="text-2xl font-bold">{personalStats.efficiency}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Дней подряд</p>
                <p className="text-2xl font-bold">{personalStats.streak}</p>
              </div>
              <Award className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ближайшие дедлайны */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Ближайшие дедлайны</span>
            </CardTitle>
            <CardDescription>Задачи, требующие внимания</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{item.task}</h4>
                    <Badge variant="outline" className={getPriorityColor(item.priority)}>
                      {item.priority === "high" ? "Высокий" : item.priority === "medium" ? "Средний" : "Низкий"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Срок: {new Date(item.deadline).toLocaleDateString()}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Прогресс</span>
                      <span>{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Достижения */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>Недавние достижения</span>
            </CardTitle>
            <CardDescription>Ваши успехи за последнее время</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div className="flex-shrink-0 mt-1">
                    <achievement.icon className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Быстрые действия */}
      <Card>
        <CardHeader>
          <CardTitle>Быстрые действия</CardTitle>
          <CardDescription>Часто используемые функции</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <MessageSquare className="h-6 w-6" />
              <span className="text-sm">Написать в чат</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Мой календарь</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <BookOpen className="h-6 w-6" />
              <span className="text-sm">Документация</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <Users className="h-6 w-6" />
              <span className="text-sm">Команда</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
