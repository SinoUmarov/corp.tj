"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Home,
  ClipboardList,
  MessageSquare,
  LogOut,
  Users,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  Settings,
  Calendar,
  FileText,
  BarChart3,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react"
import { TaskBoard } from "@/components/task-board"
import { ChatRoom } from "@/components/chat-room"
import { NotificationCenter } from "@/components/notification-center"
import { TeamManagement } from "@/components/team-management"
import { EmployeeDashboard } from "@/components/employee-dashboard"
import { CalendarView } from "@/components/calendar-view"
import { DocumentCenter } from "@/components/document-center"
import { AnalyticsView } from "@/components/analytics-view"
import { ProfileSettings } from "@/components/profile-settings"
import { useTheme } from "next-themes"

interface DashboardProps {
  onLogout: () => void
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("home")
  const [notifications, setNotifications] = useState<any[]>([])
  const [username, setUsername] = useState("")
  const [userRole, setUserRole] = useState("")
  const [userAvatar, setUserAvatar] = useState("")
  const [userDepartment, setUserDepartment] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "User"
    const storedRole = localStorage.getItem("user_role") || "employee"
    const storedAvatar = localStorage.getItem("user_avatar") || "👤"
    const storedDepartment = localStorage.getItem("user_department") || "Общий"

    setUsername(storedUsername)
    setUserRole(storedRole)
    setUserAvatar(storedAvatar)
    setUserDepartment(storedDepartment)

    // Расширенные уведомления
    const mockNotifications = [
      {
        id: 1,
        type: "task_completed",
        message: 'Задача "Обновление сайта" выполнена',
        time: new Date().toLocaleTimeString(),
        read: false,
        priority: "high",
      },
      {
        id: 2,
        type: "new_message",
        message: "Новое сообщение в чате проекта",
        time: new Date().toLocaleTimeString(),
        read: false,
        priority: "medium",
      },
      {
        id: 3,
        type: "meeting",
        message: "Встреча через 30 минут",
        time: new Date().toLocaleTimeString(),
        read: false,
        priority: "high",
      },
      {
        id: 4,
        type: "system",
        message: "Обновление системы завершено",
        time: new Date().toLocaleTimeString(),
        read: true,
        priority: "low",
      },
    ]
    setNotifications(mockNotifications)
  }, [])

  const stats =
    userRole === "admin"
      ? [
          { title: "Активные задачи", value: "24", icon: ClipboardList, color: "text-blue-600", change: "+12%" },
          { title: "Выполнено сегодня", value: "18", icon: CheckCircle2, color: "text-green-600", change: "+8%" },
          { title: "Участники онлайн", value: "32", icon: Users, color: "text-purple-600", change: "+5%" },
          { title: "Эффективность", value: "94%", icon: TrendingUp, color: "text-orange-600", change: "+2%" },
        ]
      : [
          { title: "Мои задачи", value: "8", icon: ClipboardList, color: "text-blue-600", change: "+3" },
          { title: "Выполнено мной", value: "5", icon: CheckCircle2, color: "text-green-600", change: "+2" },
          { title: "Коллеги онлайн", value: "12", icon: Users, color: "text-purple-600", change: "0" },
          { title: "Моя эффективность", value: "89%", icon: TrendingUp, color: "text-orange-600", change: "+3%" },
        ]

  const navigationItems = [
    { id: "home", label: "Главная", icon: Home, roles: ["admin", "manager", "employee"] },
    { id: "tasks", label: "Задачи", icon: ClipboardList, roles: ["admin", "manager", "employee"] },
    { id: "calendar", label: "Календарь", icon: Calendar, roles: ["admin", "manager", "employee"] },
    { id: "chat", label: "Чат", icon: MessageSquare, roles: ["admin", "manager", "employee"] },
    { id: "documents", label: "Документы", icon: FileText, roles: ["admin", "manager", "employee"] },
    { id: "analytics", label: "Аналитика", icon: BarChart3, roles: ["admin", "manager"] },
    { id: "management", label: "Команда", icon: Users, roles: ["admin", "manager"] },
  ]

  const getPageTitle = () => {
    const titles = {
      home: "Главная панель",
      tasks: "Управление задачами",
      calendar: "Календарь событий",
      chat: "Корпоративный чат",
      documents: "Центр документов",
      analytics: "Аналитика и отчеты",
      management: "Управление командой",
      settings: "Настройки профиля",
    }
    return titles[activeTab as keyof typeof titles] || "Панель управления"
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-16"} transition-all duration-300 border-r bg-card/50 backdrop-blur-sm`}
      >
        <div className="p-4">
          <div className="flex items-center space-x-3">
            {sidebarOpen && (
              <>
                <div className="text-2xl">{userAvatar}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{username}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {userRole === "admin" ? "Администратор" : userRole === "manager" ? "Менеджер" : "Сотрудник"}
                  </p>
                  <Badge variant="outline" className="text-xs mt-1">
                    {userDepartment}
                  </Badge>
                </div>
              </>
            )}
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="flex-shrink-0">
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <nav className="px-2 space-y-1">
          {navigationItems
            .filter((item) => item.roles.includes(userRole))
            .map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full ${sidebarOpen ? "justify-start" : "justify-center"} h-10`}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="h-4 w-4" />
                {sidebarOpen && <span className="ml-2">{item.label}</span>}
              </Button>
            ))}
        </nav>

        <div className="absolute bottom-4 left-2 right-2 space-y-2">
          <Button
            variant="ghost"
            className={`w-full ${sidebarOpen ? "justify-start" : "justify-center"} h-10`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="h-4 w-4" />
            {sidebarOpen && <span className="ml-2">Настройки</span>}
          </Button>
          <Button
            variant="outline"
            className={`w-full ${sidebarOpen ? "justify-start" : "justify-center"} h-10 bg-transparent`}
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4" />
            {sidebarOpen && <span className="ml-2">Выйти</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Enhanced Header */}
        <header className="border-b bg-card/50 backdrop-blur-sm px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">{getPageTitle()}</h1>
              <Badge variant="secondary" className="hidden md:inline-flex">
                <Clock className="mr-1 h-3 w-3" />
                {new Date().toLocaleTimeString()}
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              {/* Theme Toggle */}
              <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              {/* Notifications */}
              <NotificationCenter notifications={notifications} />

              {/* Profile Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{userAvatar}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{username}</p>
                      <p className="text-xs leading-none text-muted-foreground">{userDepartment}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setActiveTab("settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Настройки</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Выйти</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === "home" && userRole === "employee" && (
            <EmployeeDashboard username={username} userRole={userRole} />
          )}

          {activeTab === "home" && (userRole === "admin" || userRole === "manager") && (
            <div className="space-y-6">
              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <p className="text-xs text-green-600 mt-1">{stat.change} от прошлой недели</p>
                        </div>
                        <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-800`}>
                          <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Enhanced Activity Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle>Последние задачи</CardTitle>
                    <CardDescription>Недавно выполненные задачи команды</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          task: "Обновление дизайна главной страницы",
                          status: "completed",
                          time: "2 часа назад",
                          user: "Анна Петрова",
                        },
                        {
                          task: "Настройка системы уведомлений",
                          status: "in-progress",
                          time: "4 часа назад",
                          user: "Михаил Сидоров",
                        },
                        {
                          task: "Интеграция с CRM системой",
                          status: "pending",
                          time: "1 день назад",
                          user: "Дмитрий Волков",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            {item.status === "completed" && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                            {item.status === "in-progress" && <Clock className="h-4 w-4 text-yellow-600" />}
                            {item.status === "pending" && <AlertCircle className="h-4 w-4 text-gray-600" />}
                            <div>
                              <p className="font-medium text-sm">{item.task}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.user} • {item.time}
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant={
                              item.status === "completed"
                                ? "default"
                                : item.status === "in-progress"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {item.status === "completed"
                              ? "Выполнено"
                              : item.status === "in-progress"
                                ? "В работе"
                                : "Ожидает"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle>Команда онлайн</CardTitle>
                    <CardDescription>Участники, доступные сейчас</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          name: "Анна Петрова",
                          role: "Дизайнер",
                          status: "online",
                          avatar: "👩‍🎨",
                          activity: "Работает над макетом",
                        },
                        {
                          name: "Михаил Сидоров",
                          role: "Разработчик",
                          status: "online",
                          avatar: "👨‍💻",
                          activity: "Код-ревью",
                        },
                        {
                          name: "Елена Козлова",
                          role: "Менеджер",
                          status: "away",
                          avatar: "👩‍💼",
                          activity: "На встрече",
                        },
                        {
                          name: "Дмитрий Волков",
                          role: "Тестировщик",
                          status: "online",
                          avatar: "👨‍🔬",
                          activity: "Тестирование API",
                        },
                      ].map((member, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg">
                              {member.avatar}
                            </div>
                            <div
                              className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background ${
                                member.status === "online" ? "bg-green-500" : "bg-yellow-500"
                              }`}
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.role}</p>
                            <p className="text-xs text-blue-600">{member.activity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "tasks" && <TaskBoard />}
          {activeTab === "calendar" && <CalendarView />}
          {activeTab === "chat" && <ChatRoom />}
          {activeTab === "documents" && <DocumentCenter />}
          {activeTab === "analytics" && <AnalyticsView userRole={userRole} />}
          {activeTab === "management" && <TeamManagement userRole={userRole} />}
          {activeTab === "settings" && <ProfileSettings />}
        </main>
      </div>
    </div>
  )
}
