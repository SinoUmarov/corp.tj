"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "@/components/login-form"
import { Dashboard } from "@/components/dashboard"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Проверяем аутентификацию при загрузке
    const token = localStorage.getItem("auth_token")
    if (token) {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = async (username: string, password: string) => {
    // Симуляция асинхронного запроса к серверу
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        // Расширенная система пользователей
        const users = {
          admin: { password: "admin123", role: "admin", name: "Администратор", department: "IT", avatar: "👨‍💼" },
          anna: { password: "anna123", role: "employee", name: "Анна Петрова", department: "Дизайн", avatar: "👩‍🎨" },
          mikhail: {
            password: "mikhail123",
            role: "employee",
            name: "Михаил Сидоров",
            department: "Разработка",
            avatar: "👨‍💻",
          },
          elena: {
            password: "elena123",
            role: "manager",
            name: "Елена Козлова",
            department: "Управление",
            avatar: "👩‍💼",
          },
          dmitry: { password: "dmitry123", role: "employee", name: "Дмитрий Волков", department: "QA", avatar: "👨‍🔬" },
          maria: {
            password: "maria123",
            role: "employee",
            name: "Мария Иванова",
            department: "Маркетинг",
            avatar: "👩‍💼",
          },
          alex: {
            password: "alex123",
            role: "employee",
            name: "Александр Петров",
            department: "Продажи",
            avatar: "👨‍💼",
          },
        }

        const user = users[username as keyof typeof users]
        if (user && user.password === password) {
          localStorage.setItem("auth_token", "authenticated")
          localStorage.setItem("user_role", user.role)
          localStorage.setItem("username", user.name)
          localStorage.setItem("user_id", username)
          localStorage.setItem("user_department", user.department)
          localStorage.setItem("user_avatar", user.avatar)
          setIsAuthenticated(true)
          resolve(true)
        } else {
          resolve(false)
        }
      }, 1000)
    })
  }

  const handleLogout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_role")
    localStorage.removeItem("username")
    localStorage.removeItem("user_id")
    localStorage.removeItem("user_department")
    localStorage.removeItem("user_avatar")
    setIsAuthenticated(false)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="text-lg font-medium text-gray-600">Загрузка корпоративного портала...</p>
        </div>
      </div>
    )
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-background">
        {!isAuthenticated ? <LoginForm onLogin={handleLogin} /> : <Dashboard onLogout={handleLogout} />}
      </div>
    </ThemeProvider>
  )
}
