"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, MapPin, Save, Camera, Key, Download, Trash2 } from "lucide-react"
import { useTheme } from "next-themes"

export function ProfileSettings() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    department: "",
    position: "",
    bio: "",
    avatar: "",
  })

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    tasks: true,
    meetings: true,
    mentions: false,
  })

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    statusVisible: true,
    activityVisible: false,
  })

  const { theme, setTheme } = useTheme()

  useEffect(() => {
    // Загружаем данные профиля из localStorage
    const storedProfile = {
      name: localStorage.getItem("username") || "",
      email: `${localStorage.getItem("user_id") || "user"}@company.com`,
      phone: "+7 (999) 123-45-67",
      location: "Москва, Россия",
      department: localStorage.getItem("user_department") || "",
      position:
        localStorage.getItem("user_role") === "admin"
          ? "Администратор"
          : localStorage.getItem("user_role") === "manager"
            ? "Менеджер"
            : "Сотрудник",
      bio: "Опытный специалист с многолетним стажем работы в IT-сфере.",
      avatar: localStorage.getItem("user_avatar") || "👤",
    }
    setProfile(storedProfile)
  }, [])

  const handleSaveProfile = () => {
    // Сохраняем изменения в localStorage
    localStorage.setItem("username", profile.name)
    localStorage.setItem("user_department", profile.department)
    alert("Профиль успешно обновлен!")
  }

  const handleExportData = () => {
    const data = {
      profile,
      notifications,
      privacy,
      exportDate: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "profile-data.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Настройки профиля</h2>
          <p className="text-muted-foreground">Управление личными данными и настройками</p>
        </div>
        <Button onClick={handleSaveProfile}>
          <Save className="mr-2 h-4 w-4" />
          Сохранить изменения
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Профиль</TabsTrigger>
          <TabsTrigger value="notifications">Уведомления</TabsTrigger>
          <TabsTrigger value="privacy">Приватность</TabsTrigger>
          <TabsTrigger value="appearance">Внешний вид</TabsTrigger>
          <TabsTrigger value="security">Безопасность</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
              <CardDescription>Обновите свои личные данные</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-4xl">
                    {profile.avatar}
                  </div>
                  <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">{profile.name}</h3>
                  <p className="text-sm text-muted-foreground">{profile.position}</p>
                  <Badge variant="secondary">{profile.department}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Полное имя</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Местоположение</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile((prev) => ({ ...prev, location: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Отдел</Label>
                  <Select
                    value={profile.department}
                    onValueChange={(value) => setProfile((prev) => ({ ...prev, department: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="Дизайн">Дизайн</SelectItem>
                      <SelectItem value="Разработка">Разработка</SelectItem>
                      <SelectItem value="QA">QA</SelectItem>
                      <SelectItem value="Управление">Управление</SelectItem>
                      <SelectItem value="Маркетинг">Маркетинг</SelectItem>
                      <SelectItem value="Продажи">Продажи</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Должность</Label>
                  <Input
                    id="position"
                    value={profile.position}
                    onChange={(e) => setProfile((prev) => ({ ...prev, position: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">О себе</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                  placeholder="Расскажите о себе..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Настройки уведомлений</CardTitle>
              <CardDescription>Управляйте способами получения уведомлений</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email уведомления</Label>
                    <p className="text-sm text-muted-foreground">Получать уведомления на электронную почту</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push уведомления</Label>
                    <p className="text-sm text-muted-foreground">Получать push-уведомления в браузере</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Уведомления о задачах</Label>
                    <p className="text-sm text-muted-foreground">Новые задачи и изменения статуса</p>
                  </div>
                  <Switch
                    checked={notifications.tasks}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, tasks: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Уведомления о встречах</Label>
                    <p className="text-sm text-muted-foreground">Напоминания о предстоящих встречах</p>
                  </div>
                  <Switch
                    checked={notifications.meetings}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, meetings: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Упоминания в чате</Label>
                    <p className="text-sm text-muted-foreground">Когда вас упоминают в сообщениях</p>
                  </div>
                  <Switch
                    checked={notifications.mentions}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, mentions: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Настройки приватности</CardTitle>
              <CardDescription>Контролируйте видимость вашей информации</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Видимость профиля</Label>
                    <p className="text-sm text-muted-foreground">Другие сотрудники могут видеть ваш профиль</p>
                  </div>
                  <Switch
                    checked={privacy.profileVisible}
                    onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, profileVisible: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Показывать статус</Label>
                    <p className="text-sm text-muted-foreground">Отображать ваш онлайн статус</p>
                  </div>
                  <Switch
                    checked={privacy.statusVisible}
                    onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, statusVisible: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Показывать активность</Label>
                    <p className="text-sm text-muted-foreground">Другие могут видеть вашу рабочую активность</p>
                  </div>
                  <Switch
                    checked={privacy.activityVisible}
                    onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, activityVisible: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Внешний вид</CardTitle>
              <CardDescription>Настройте интерфейс под себя</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Тема оформления</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Светлая</SelectItem>
                      <SelectItem value="dark">Темная</SelectItem>
                      <SelectItem value="system">Системная</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Язык интерфейса</Label>
                  <Select defaultValue="ru">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ru">Русский</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Часовой пояс</Label>
                  <Select defaultValue="msk">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="msk">Москва (UTC+3)</SelectItem>
                      <SelectItem value="spb">Санкт-Петербург (UTC+3)</SelectItem>
                      <SelectItem value="ekb">Екатеринбург (UTC+5)</SelectItem>
                      <SelectItem value="nsk">Новосибирск (UTC+7)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Безопасность</CardTitle>
              <CardDescription>Управление паролем и безопасностью аккаунта</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Key className="mr-2 h-4 w-4" />
                  Изменить пароль
                </Button>

                <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleExportData}>
                  <Download className="mr-2 h-4 w-4" />
                  Экспортировать данные
                </Button>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-red-600 mb-2">Опасная зона</h4>
                  <Button variant="destructive" className="w-full justify-start">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Удалить аккаунт
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
