"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Building2, Eye, EyeOff, Shield, Users, Zap } from "lucide-react"

interface LoginFormProps {
  onLogin: (username: string, password: string) => Promise<boolean>
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const success = await onLogin(username, password)
      if (!success) {
        setError("Неверный логин или пароль")
      }
    } catch (err) {
      setError("Ошибка подключения к серверу")
    } finally {
      setIsLoading(false)
    }
  }

  const quickLogin = (user: string, pass: string) => {
    setUsername(user)
    setPassword(pass)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="hidden lg:block space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-6">
              <Building2 className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Корпоративный портал</h1>
            <p className="text-xl text-gray-600">Современное решение для управления командой</p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-center space-x-4 p-4 bg-white/50 rounded-xl backdrop-blur-sm">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Управление командой</h3>
                <p className="text-sm text-gray-600">Эффективное взаимодействие и контроль задач</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-white/50 rounded-xl backdrop-blur-sm">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Высокая производительность</h3>
                <p className="text-sm text-gray-600">Оптимизация рабочих процессов</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-white/50 rounded-xl backdrop-blur-sm">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Безопасность данных</h3>
                <p className="text-sm text-gray-600">Надежная защита корпоративной информации</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <div className="lg:hidden flex justify-center mb-4">
              <Building2 className="h-12 w-12 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Добро пожаловать!</CardTitle>
            <CardDescription>Войдите в систему для доступа к корпоративным ресурсам</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Вход</TabsTrigger>
                <TabsTrigger value="demo">Демо доступы</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Логин</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Введите логин"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      disabled={isLoading}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Пароль</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Введите пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                        className="h-11 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <Button type="submit" className="w-full h-11" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Вход в систему...
                      </>
                    ) : (
                      "Войти в систему"
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="demo" className="space-y-4">
                <div className="space-y-3">
                  <div className="text-sm font-medium text-gray-700 mb-3">Быстрый вход:</div>

                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto p-3 bg-transparent"
                    onClick={() => quickLogin("admin", "admin123")}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">👨‍💼</div>
                      <div className="text-left">
                        <div className="font-medium">Администратор</div>
                        <div className="text-xs text-muted-foreground">Полный доступ к системе</div>
                      </div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto p-3 bg-transparent"
                    onClick={() => quickLogin("elena", "elena123")}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">👩‍💼</div>
                      <div className="text-left">
                        <div className="font-medium">Елена Козлова</div>
                        <div className="text-xs text-muted-foreground">Менеджер проекта</div>
                      </div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto p-3 bg-transparent"
                    onClick={() => quickLogin("anna", "anna123")}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">👩‍🎨</div>
                      <div className="text-left">
                        <div className="font-medium">Анна Петрова</div>
                        <div className="text-xs text-muted-foreground">Дизайнер</div>
                      </div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto p-3 bg-transparent"
                    onClick={() => quickLogin("mikhail", "mikhail123")}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">👨‍💻</div>
                      <div className="text-left">
                        <div className="font-medium">Михаил Сидоров</div>
                        <div className="text-xs text-muted-foreground">Разработчик</div>
                      </div>
                    </div>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
