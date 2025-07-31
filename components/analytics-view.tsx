"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp, TrendingDown, Users, Clock, Target, Award, Download, RefreshCw } from "lucide-react"

interface AnalyticsViewProps {
  userRole: string
}

export function AnalyticsView({ userRole }: AnalyticsViewProps) {
  const [timeRange, setTimeRange] = useState("7d")
  const [isLoading, setIsLoading] = useState(false)

  const refreshData = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  const performanceData = [
    { month: "Янв", tasks: 45, efficiency: 87 },
    { month: "Фев", tasks: 52, efficiency: 91 },
    { month: "Мар", tasks: 48, efficiency: 89 },
    { month: "Апр", tasks: 61, efficiency: 94 },
    { month: "Май", tasks: 55, efficiency: 92 },
    { month: "Июн", tasks: 67, efficiency: 96 },
  ]

  const departmentStats = [
    { name: "Разработка", members: 8, efficiency: 94, tasks: 156, color: "bg-blue-500" },
    { name: "Дизайн", members: 4, efficiency: 91, tasks: 89, color: "bg-purple-500" },
    { name: "QA", members: 3, efficiency: 88, tasks: 67, color: "bg-green-500" },
    { name: "Управление", members: 2, efficiency: 96, tasks: 34, color: "bg-orange-500" },
    { name: "Маркетинг", members: 3, efficiency: 85, tasks: 45, color: "bg-pink-500" },
  ]

  const topPerformers = [
    { name: "Анна Петрова", department: "Дизайн", tasks: 34, efficiency: 97, avatar: "👩‍🎨" },
    { name: "Михаил Сидоров", department: "Разработка", tasks: 42, efficiency: 95, avatar: "👨‍💻" },
    { name: "Дмитрий Волков", department: "QA", tasks: 28, efficiency: 93, avatar: "👨‍🔬" },
    { name: "Елена Козлова", department: "Управление", tasks: 19, efficiency: 98, avatar: "👩‍💼" },
  ]

  const kpiMetrics = [
    {
      title: "Общая производительность",
      value: "94%",
      change: "+5%",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Выполнено задач",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: Target,
      color: "text-blue-600",
    },
    {
      title: "Среднее время выполнения",
      value: "2.3 дня",
      change: "-8%",
      trend: "down",
      icon: Clock,
      color: "text-purple-600",
    },
    {
      title: "Активных сотрудников",
      value: "24",
      change: "+2",
      trend: "up",
      icon: Users,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Аналитика и отчеты</h2>
          <p className="text-muted-foreground">
            {userRole === "admin" ? "Полная аналитика компании" : "Аналитика отдела"}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 дней</SelectItem>
              <SelectItem value="30d">30 дней</SelectItem>
              <SelectItem value="90d">90 дней</SelectItem>
              <SelectItem value="1y">1 год</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={refreshData} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Обновить
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Экспорт
          </Button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-600" />
                    )}
                    <span className={`text-xs ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-800`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="performance">Производительность</TabsTrigger>
          <TabsTrigger value="departments">Отделы</TabsTrigger>
          <TabsTrigger value="employees">Сотрудники</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Динамика выполнения задач</CardTitle>
                <CardDescription>Количество выполненных задач по месяцам</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {performanceData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                      <div className="text-xs font-medium">{data.tasks}</div>
                      <div
                        className="bg-blue-600 rounded-t w-full"
                        style={{ height: `${(data.tasks / 70) * 200}px` }}
                      ></div>
                      <span className="text-xs text-muted-foreground">{data.month}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Эффективность команды</CardTitle>
                <CardDescription>Процент эффективности по месяцам</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {performanceData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                      <div className="text-xs font-medium">{data.efficiency}%</div>
                      <div
                        className="bg-green-600 rounded-t w-full"
                        style={{ height: `${(data.efficiency / 100) * 200}px` }}
                      ></div>
                      <span className="text-xs text-muted-foreground">{data.month}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Топ исполнители</CardTitle>
                <CardDescription>Лучшие сотрудники по результатам</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((performer, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        {index + 1}
                      </div>
                      <div className="text-2xl">{performer.avatar}</div>
                      <div className="flex-1">
                        <p className="font-medium">{performer.name}</p>
                        <p className="text-sm text-muted-foreground">{performer.department}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{performer.tasks} задач</p>
                        <p className="text-sm text-green-600">{performer.efficiency}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Статистика по типам задач</CardTitle>
                <CardDescription>Распределение задач по категориям</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: "Разработка", count: 45, percentage: 35, color: "bg-blue-500" },
                    { type: "Дизайн", count: 32, percentage: 25, color: "bg-purple-500" },
                    { type: "Тестирование", count: 28, percentage: 22, color: "bg-green-500" },
                    { type: "Документация", count: 23, percentage: 18, color: "bg-orange-500" },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.type}</span>
                        <span className="text-sm text-muted-foreground">{item.count} задач</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${item.color}`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Детальная производительность</CardTitle>
                <CardDescription>Анализ производительности за выбранный период</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Интерактивный график производительности</p>
                    <p className="text-sm">Функция в разработке</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ключевые показатели</CardTitle>
                <CardDescription>Основные метрики производительности</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Скорость выполнения</p>
                      <p className="text-sm text-muted-foreground">Задач в день</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">8.4</p>
                      <p className="text-xs text-green-600">+12%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Качество работы</p>
                      <p className="text-sm text-muted-foreground">Без ошибок</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">96%</p>
                      <p className="text-xs text-green-600">+3%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Соблюдение сроков</p>
                      <p className="text-sm text-muted-foreground">В срок</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">89%</p>
                      <p className="text-xs text-red-600">-2%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departments">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departmentStats.map((dept, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {dept.name}
                    <div className={`w-4 h-4 rounded-full ${dept.color}`} />
                  </CardTitle>
                  <CardDescription>{dept.members} сотрудников</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Эффективность</span>
                      <span className="text-2xl font-bold">{dept.efficiency}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${dept.color}`} style={{ width: `${dept.efficiency}%` }}></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Задач выполнено</p>
                        <p className="font-medium">{dept.tasks}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Средняя нагрузка</p>
                        <p className="font-medium">{Math.round(dept.tasks / dept.members)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="employees">
          <Card>
            <CardHeader>
              <CardTitle>Индивидуальная производительность</CardTitle>
              <CardDescription>Детальная статистика по каждому сотруднику</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformers.map((employee, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{employee.avatar}</div>
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-muted-foreground">{employee.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Задач</p>
                        <p className="font-bold">{employee.tasks}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Эффективность</p>
                        <p className="font-bold text-green-600">{employee.efficiency}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Рейтинг</p>
                        <div className="flex items-center space-x-1">
                          <Award className="h-4 w-4 text-yellow-500" />
                          <span className="font-bold">#{index + 1}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
