"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserPlus, Users, Mail, Phone, MapPin, Clock, Award, TrendingUp } from "lucide-react"

interface Employee {
  id: number
  name: string
  email: string
  role: string
  department: string
  status: "active" | "away" | "busy" | "offline"
  joinDate: string
  tasksCompleted: number
  efficiency: number
  phone?: string
  location?: string
}

interface TeamManagementProps {
  userRole: string
}

export function TeamManagement({ userRole }: TeamManagementProps) {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    role: "employee",
    department: "",
    phone: "",
    location: "",
  })

  useEffect(() => {
    // Симуляция загрузки сотрудников
    const mockEmployees: Employee[] = [
      {
        id: 1,
        name: "Анна Петрова",
        email: "anna@company.com",
        role: "Дизайнер",
        department: "Дизайн",
        status: "active",
        joinDate: "2023-01-15",
        tasksCompleted: 24,
        efficiency: 92,
        phone: "+7 (999) 123-45-67",
        location: "Москва",
      },
      {
        id: 2,
        name: "Михаил Сидоров",
        email: "mikhail@company.com",
        role: "Разработчик",
        department: "Разработка",
        status: "active",
        joinDate: "2022-11-20",
        tasksCompleted: 31,
        efficiency: 88,
        phone: "+7 (999) 234-56-78",
        location: "Санкт-Петербург",
      },
      {
        id: 3,
        name: "Елена Козлова",
        email: "elena@company.com",
        role: "Менеджер проекта",
        department: "Управление",
        status: "away",
        joinDate: "2022-03-10",
        tasksCompleted: 18,
        efficiency: 95,
        phone: "+7 (999) 345-67-89",
        location: "Москва",
      },
      {
        id: 4,
        name: "Дмитрий Волков",
        email: "dmitry@company.com",
        role: "Тестировщик",
        department: "QA",
        status: "busy",
        joinDate: "2023-06-01",
        tasksCompleted: 19,
        efficiency: 85,
        phone: "+7 (999) 456-78-90",
        location: "Екатеринбург",
      },
    ]
    setEmployees(mockEmployees)
  }, [])

  const handleAddEmployee = () => {
    if (!newEmployee.name.trim() || !newEmployee.email.trim()) return

    const employee: Employee = {
      id: Date.now(),
      name: newEmployee.name,
      email: newEmployee.email,
      role: newEmployee.role,
      department: newEmployee.department,
      status: "active",
      joinDate: new Date().toISOString().split("T")[0],
      tasksCompleted: 0,
      efficiency: 0,
      phone: newEmployee.phone,
      location: newEmployee.location,
    }

    setEmployees((prev) => [...prev, employee])
    setNewEmployee({
      name: "",
      email: "",
      role: "employee",
      department: "",
      phone: "",
      location: "",
    })
    setIsAddDialogOpen(false)
  }

  const getStatusColor = (status: Employee["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "busy":
        return "bg-red-500"
      case "offline":
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: Employee["status"]) => {
    switch (status) {
      case "active":
        return "Активен"
      case "away":
        return "Отошел"
      case "busy":
        return "Занят"
      case "offline":
        return "Не в сети"
    }
  }

  const departmentStats = [
    { name: "Разработка", count: 8, efficiency: 89 },
    { name: "Дизайн", count: 4, efficiency: 92 },
    { name: "QA", count: 3, efficiency: 87 },
    { name: "Управление", count: 2, efficiency: 95 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Управление командой</h2>
          <p className="text-muted-foreground">
            {userRole === "admin" ? "Полное управление сотрудниками" : "Просмотр команды"}
          </p>
        </div>
        {userRole === "admin" && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Добавить сотрудника
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Добавить нового сотрудника</DialogTitle>
                <DialogDescription>Заполните информацию о новом сотруднике</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Имя</Label>
                    <Input
                      id="name"
                      value={newEmployee.name}
                      onChange={(e) => setNewEmployee((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Полное имя"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newEmployee.email}
                      onChange={(e) => setNewEmployee((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="email@company.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="role">Должность</Label>
                    <Input
                      id="role"
                      value={newEmployee.role}
                      onChange={(e) => setNewEmployee((prev) => ({ ...prev, role: e.target.value }))}
                      placeholder="Должность"
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Отдел</Label>
                    <Select
                      value={newEmployee.department}
                      onValueChange={(value) => setNewEmployee((prev) => ({ ...prev, department: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите отдел" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Разработка">Разработка</SelectItem>
                        <SelectItem value="Дизайн">Дизайн</SelectItem>
                        <SelectItem value="QA">QA</SelectItem>
                        <SelectItem value="Управление">Управление</SelectItem>
                        <SelectItem value="Маркетинг">Маркетинг</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      value={newEmployee.phone}
                      onChange={(e) => setNewEmployee((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Местоположение</Label>
                    <Input
                      id="location"
                      value={newEmployee.location}
                      onChange={(e) => setNewEmployee((prev) => ({ ...prev, location: e.target.value }))}
                      placeholder="Город"
                    />
                  </div>
                </div>
                <Button onClick={handleAddEmployee} className="w-full">
                  Добавить сотрудника
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="employees">Сотрудники</TabsTrigger>
          <TabsTrigger value="departments">Отделы</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Всего сотрудников</p>
                    <p className="text-2xl font-bold">{employees.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Активных</p>
                    <p className="text-2xl font-bold">{employees.filter((e) => e.status === "active").length}</p>
                  </div>
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Средняя эффективность</p>
                    <p className="text-2xl font-bold">
                      {Math.round(employees.reduce((acc, emp) => acc + emp.efficiency, 0) / employees.length)}%
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Задач выполнено</p>
                    <p className="text-2xl font-bold">{employees.reduce((acc, emp) => acc + emp.tasksCompleted, 0)}</p>
                  </div>
                  <Award className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Топ сотрудники</CardTitle>
                <CardDescription>По количеству выполненных задач</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employees
                    .sort((a, b) => b.tasksCompleted - a.tasksCompleted)
                    .slice(0, 5)
                    .map((employee, index) => (
                      <div key={employee.id} className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                          {index + 1}
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {employee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{employee.name}</p>
                          <p className="text-xs text-muted-foreground">{employee.role}</p>
                        </div>
                        <Badge variant="secondary">{employee.tasksCompleted} задач</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Статус команды</CardTitle>
                <CardDescription>Текущий статус сотрудников</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employees.map((employee) => (
                    <div key={employee.id} className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {employee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(employee.status)}`}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{employee.name}</p>
                        <p className="text-xs text-muted-foreground">{getStatusText(employee.status)}</p>
                      </div>
                      <Badge variant="outline">{employee.efficiency}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="employees">
          <Card>
            <CardHeader>
              <CardTitle>Список сотрудников</CardTitle>
              <CardDescription>Полная информация о команде</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Сотрудник</TableHead>
                    <TableHead>Должность</TableHead>
                    <TableHead>Отдел</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Эффективность</TableHead>
                    <TableHead>Задач выполнено</TableHead>
                    <TableHead>Контакты</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {employee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{employee.name}</p>
                            <p className="text-sm text-muted-foreground">{employee.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{employee.role}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className={`h-2 w-2 rounded-full ${getStatusColor(employee.status)}`} />
                          <span className="text-sm">{getStatusText(employee.status)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={employee.efficiency >= 90 ? "default" : "secondary"}>
                          {employee.efficiency}%
                        </Badge>
                      </TableCell>
                      <TableCell>{employee.tasksCompleted}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {employee.phone && (
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <Phone className="h-3 w-3" />
                            </Button>
                          )}
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Mail className="h-3 w-3" />
                          </Button>
                          {employee.location && (
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <MapPin className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {departmentStats.map((dept) => (
              <Card key={dept.name}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {dept.name}
                    <Badge variant="secondary">{dept.count} чел.</Badge>
                  </CardTitle>
                  <CardDescription>Статистика отдела</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Эффективность</span>
                      <span className="text-2xl font-bold">{dept.efficiency}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${dept.efficiency}%` }}></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Активных</p>
                        <p className="font-medium">
                          {employees.filter((e) => e.department === dept.name && e.status === "active").length}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Задач выполнено</p>
                        <p className="font-medium">
                          {employees
                            .filter((e) => e.department === dept.name)
                            .reduce((acc, emp) => acc + emp.tasksCompleted, 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Производительность по месяцам</CardTitle>
                <CardDescription>Динамика выполнения задач</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {[65, 78, 82, 88, 92, 89].map((value, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2">
                      <div
                        className="bg-blue-600 rounded-t"
                        style={{ height: `${(value / 100) * 200}px`, width: "40px" }}
                      ></div>
                      <span className="text-xs text-muted-foreground">
                        {["Янв", "Фев", "Мар", "Апр", "Май", "Июн"][index]}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Распределение по отделам</CardTitle>
                <CardDescription>Количество сотрудников</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentStats.map((dept) => (
                    <div key={dept.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-blue-600 rounded"></div>
                        <span className="font-medium">{dept.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">{dept.count} чел.</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(dept.count / employees.length) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
