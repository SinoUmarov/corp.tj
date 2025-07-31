"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Send, Video, Phone, Mic, MicOff, VideoOff, Users, Paperclip, Smile } from "lucide-react"

interface Message {
  id: number
  sender: string
  content: string
  timestamp: string
  type: "text" | "system"
}

interface User {
  id: number
  name: string
  status: "online" | "away" | "busy"
  avatar: string
}

export function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [isVideoCall, setIsVideoCall] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Симуляция загрузки пользователей
    const mockUsers: User[] = [
      { id: 1, name: "Анна Петрова", status: "online", avatar: "АП" },
      { id: 2, name: "Михаил Сидоров", status: "online", avatar: "МС" },
      { id: 3, name: "Елена Козлова", status: "away", avatar: "ЕК" },
      { id: 4, name: "Дмитрий Волков", status: "busy", avatar: "ДВ" },
    ]
    setUsers(mockUsers)

    // Симуляция загрузки сообщений
    const mockMessages: Message[] = [
      {
        id: 1,
        sender: "Система",
        content: "Добро пожаловать в корпоративный чат!",
        timestamp: "09:00",
        type: "system",
      },
      {
        id: 2,
        sender: "Анна Петрова",
        content: "Доброе утро! Как дела с новым проектом?",
        timestamp: "09:15",
        type: "text",
      },
      {
        id: 3,
        sender: "Михаил Сидоров",
        content: "Привет! Все идет по плану, сегодня закончу с API",
        timestamp: "09:17",
        type: "text",
      },
      {
        id: 4,
        sender: "Елена Козлова",
        content: "Отлично! Не забудьте про встречу в 14:00",
        timestamp: "09:20",
        type: "text",
      },
    ]
    setMessages(mockMessages)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now(),
      sender: "Admin",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "text",
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Симуляция ответа от другого пользователя
    setTimeout(
      () => {
        const responses = [
          "Понял, спасибо за информацию!",
          "Хорошо, учту это в работе",
          "Согласен, давайте так и сделаем",
          "Отличная идея!",
          "Нужно обсудить это подробнее",
        ]

        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        const responseMessage: Message = {
          id: Date.now() + 1,
          sender: "Анна Петрова",
          content: randomResponse,
          timestamp: new Date().toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: "text",
        }
        setMessages((prev) => [...prev, responseMessage])
      },
      1000 + Math.random() * 2000,
    )
  }

  const startVideoCall = async () => {
    setIsVideoCall(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      // Добавляем системное сообщение о начале звонка
      const callMessage: Message = {
        id: Date.now(),
        sender: "Система",
        content: "Видеозвонок начат",
        timestamp: new Date().toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "system",
      }
      setMessages((prev) => [...prev, callMessage])
    } catch (error) {
      console.error("Ошибка доступа к камере:", error)
      alert("Не удалось получить доступ к камере и микрофону")
      setIsVideoCall(false)
    }
  }

  const endVideoCall = () => {
    setIsVideoCall(false)
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
    }

    const endCallMessage: Message = {
      id: Date.now(),
      sender: "Система",
      content: "Видеозвонок завершен",
      timestamp: new Date().toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "system",
    }
    setMessages((prev) => [...prev, endCallMessage])
  }

  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "busy":
        return "bg-red-500"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
      {/* Users List */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Участники ({users.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {users.map((user) => (
              <div key={user.id} className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user.avatar}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(user.status)}`}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="lg:col-span-3 flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Общий чат</CardTitle>
            <div className="flex space-x-2">
              {!isVideoCall ? (
                <>
                  <Button size="sm" variant="outline" onClick={startVideoCall}>
                    <Video className="h-4 w-4 mr-2" />
                    Видеозвонок
                  </Button>
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Аудиозвонок
                  </Button>
                </>
              ) : (
                <div className="flex space-x-2">
                  <Button size="sm" variant={isMuted ? "destructive" : "outline"} onClick={() => setIsMuted(!isMuted)}>
                    {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant={!isVideoEnabled ? "destructive" : "outline"}
                    onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                  >
                    {isVideoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                  </Button>
                  <Button size="sm" variant="destructive" onClick={endVideoCall}>
                    Завершить
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        {/* Video Call Area */}
        {isVideoCall && (
          <div className="px-6 pb-4">
            <div className="relative bg-black rounded-lg overflow-hidden" style={{ height: "300px" }}>
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-full object-cover"
                style={{ display: isVideoEnabled ? "block" : "none" }}
              />
              {!isVideoEnabled && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-white">
                    <VideoOff className="h-12 w-12 mx-auto mb-2" />
                    <p>Видео отключено</p>
                  </div>
                </div>
              )}
              <div className="absolute top-4 left-4">
                <Badge variant="secondary">{isMuted ? "Микрофон выключен" : "В эфире"}</Badge>
              </div>
            </div>
          </div>
        )}

        <Separator />

        {/* Messages */}
        <CardContent className="flex-1 overflow-auto p-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "Admin" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md ${
                    message.type === "system"
                      ? "mx-auto"
                      : message.sender === "Admin"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                  } rounded-lg p-3`}
                >
                  {message.type === "system" ? (
                    <p className="text-center text-sm text-muted-foreground italic">{message.content}</p>
                  ) : (
                    <>
                      {message.sender !== "Admin" && <p className="font-medium text-sm mb-1">{message.sender}</p>}
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "Admin" ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>

        <Separator />

        {/* Message Input */}
        <div className="p-6">
          <div className="flex space-x-2">
            <Button size="sm" variant="outline">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline">
              <Smile className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Введите сообщение..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
