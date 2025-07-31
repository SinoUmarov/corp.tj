"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Calendar, Plus, Clock, Video, ChevronLeft, ChevronRight, Filter, Download } from "lucide-react"

interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  duration: number
  type: "meeting" | "deadline" | "event" | "reminder"
  attendees: string[]
  location?: string
  isOnline: boolean
  priority: "low" | "medium" | "high"
  color: string
}

export function CalendarView() {
  const [events, setEvents] = useState<Event[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month")
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    duration: 60,
    type: "meeting" as const,
    attendees: "",
    location: "",
    isOnline: false,
    priority: "medium" as const,
  })

  useEffect(() => {
    // Симуляция загрузки событий
    const mockEvents: Event[] = [
      {
        id: 1,
        title: "Планерка команды",
        description: "Еженедельная встреча команды разработки",
        date: "2024-02-15",
        time: "10:00",
        duration: 60,
        type: "meeting",
        attendees: ["Анна Петрова", "Михаил Сидоров", "Дмитрий Волков"],
        location: "Конференц-зал А",
        isOnline: false,
        priority: "high",
        color: "bg-blue-500",
      },
      {
        id: 2,
        title: "Дедлайн проекта",
        description: "Сдача финальной версии сайта",
        date: "2024-02-20",
        time: "18:00",
        duration: 0,
        type: "deadline",
        attendees: [],
        isOnline: false,
        priority: "high",
        color: "bg-red-500",
      },
      {
        id: 3,
        title: "Презентация для клиента",
        description: "Демонстрация нового функционала",
        date: "2024-02-18",
        time: "14:00",
        duration: 90,
        type: "meeting",
        attendees: ["Елена Козлова", "Анна Петрова"],
        isOnline: true,
        priority: "high",
        color: "bg-green-500",
      },
      {
        id: 4,
        title: "Корпоративное мероприятие",
        description: "День рождения компании",
        date: "2024-02-25",
        time: "19:00",
        duration: 180,
        type: "event",
        attendees: ["Вся команда"],
        location: "Ресторан 'Панорама'",
        isOnline: false,
        priority: "medium",
        color: "bg-purple-500",
      },
    ]
    setEvents(mockEvents)
  }, [])

  const handleCreateEvent = () => {
    if (!newEvent.title.trim()) return

    const event: Event = {
      id: Date.now(),
      title: newEvent.title,
      description: newEvent.description,
      date: newEvent.date,
      time: newEvent.time,
      duration: newEvent.duration,
      type: newEvent.type,
      attendees: newEvent.attendees
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
      location: newEvent.location,
      isOnline: newEvent.isOnline,
      priority: newEvent.priority,
      color: getEventColor(newEvent.type),
    }

    setEvents((prev) => [...prev, event])
    setNewEvent({
      title: "",
      description: "",
      date: "",
      time: "",
      duration: 60,
      type: "meeting",
      attendees: "",
      location: "",
      isOnline: false,
      priority: "medium",
    })
    setIsDialogOpen(false)
  }

  const getEventColor = (type: Event["type"]) => {
    switch (type) {
      case "meeting":
        return "bg-blue-500"
      case "deadline":
        return "bg-red-500"
      case "event":
        return "bg-purple-500"
      case "reminder":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getEventTypeLabel = (type: Event["type"]) => {
    switch (type) {
      case "meeting":
        return "Встреча"
      case "deadline":
        return "Дедлайн"
      case "event":
        return "Событие"
      case "reminder":
        return "Напоминание"
    }
  }

  const getPriorityColor = (priority: Event["priority"]) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
    }
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev)
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1)
      } else {
        newMonth.setMonth(prev.getMonth() + 1)
      }
      return newMonth
    })
  }

  const getEventsForDate = (date: string) => {
    return events.filter((event) => event.date === date)
  }

  const todayEvents = events.filter((event) => event.date === new Date().toISOString().split("T")[0])
  const upcomingEvents = events
    .filter((event) => new Date(event.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Календарь событий</h2>
          <p className="text-muted-foreground">Управление встречами и событиями</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Фильтр
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Экспорт
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Создать событие
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Создать новое событие</DialogTitle>
                <DialogDescription>Заполните информацию о событии</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Название события</Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Введите название"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Описание</Label>
                    <Textarea
                      id="description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Описание события"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="date">Дата</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent((prev) => ({ ...prev, date: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Время</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent((prev) => ({ ...prev, time: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="type">Тип события</Label>
                      <Select
                        value={newEvent.type}
                        onValueChange={(value: any) => setNewEvent((prev) => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="meeting">Встреча</SelectItem>
                          <SelectItem value="deadline">Дедлайн</SelectItem>
                          <SelectItem value="event">Событие</SelectItem>
                          <SelectItem value="reminder">Напоминание</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="priority">Приоритет</Label>
                      <Select
                        value={newEvent.priority}
                        onValueChange={(value: any) => setNewEvent((prev) => ({ ...prev, priority: value }))}
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
                  </div>
                  <div>
                    <Label htmlFor="attendees">Участники</Label>
                    <Input
                      id="attendees"
                      value={newEvent.attendees}
                      onChange={(e) => setNewEvent((prev) => ({ ...prev, attendees: e.target.value }))}
                      placeholder="Имена через запятую"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Место проведения</Label>
                    <Input
                      id="location"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent((prev) => ({ ...prev, location: e.target.value }))}
                      placeholder="Адрес или название"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isOnline"
                      checked={newEvent.isOnline}
                      onChange={(e) => setNewEvent((prev) => ({ ...prev, isOnline: e.target.checked }))}
                    />
                    <Label htmlFor="isOnline">Онлайн событие</Label>
                  </div>
                </div>
              </div>
              <Button onClick={handleCreateEvent} className="w-full mt-4">
                Создать событие
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={viewMode} onValueChange={(value: any) => setViewMode(value)} className="space-y-4">
        <TabsList>
          <TabsTrigger value="month">Месяц</TabsTrigger>
          <TabsTrigger value="week">Неделя</TabsTrigger>
          <TabsTrigger value="day">День</TabsTrigger>
        </TabsList>

        <TabsContent value="month">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>
                        {currentMonth.toLocaleDateString("ru-RU", {
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
                      <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: getDaysInMonth(currentMonth) }, (_, i) => {
                      const day = i + 1
                      const dateString = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                      const dayEvents = getEventsForDate(dateString)
                      const isToday = dateString === new Date().toISOString().split("T")[0]

                      return (
                        <div
                          key={day}
                          className={`min-h-[80px] p-1 border rounded-lg hover:bg-muted/50 cursor-pointer ${
                            isToday ? "bg-blue-50 border-blue-200" : ""
                          }`}
                          onClick={() => setSelectedDate(new Date(dateString))}
                        >
                          <div className={`text-sm font-medium mb-1 ${isToday ? "text-blue-600" : ""}`}>{day}</div>
                          <div className="space-y-1">
                            {dayEvents.slice(0, 2).map((event) => (
                              <div key={event.id} className={`text-xs p-1 rounded text-white truncate ${event.color}`}>
                                {event.title}
                              </div>
                            ))}
                            {dayEvents.length > 2 && (
                              <div className="text-xs text-muted-foreground">+{dayEvents.length - 2} еще</div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Сегодня</CardTitle>
                  <CardDescription>{todayEvents.length} событий</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {todayEvents.length === 0 ? (
                      <p className="text-sm text-muted-foreground">Нет событий на сегодня</p>
                    ) : (
                      todayEvents.map((event) => (
                        <div key={event.id} className="flex items-start space-x-3 p-2 border rounded-lg">
                          <div className={`w-3 h-3 rounded-full mt-1 ${event.color}`} />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{event.title}</p>
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{event.time}</span>
                              {event.isOnline && <Video className="h-3 w-3" />}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ближайшие события</CardTitle>
                  <CardDescription>Предстоящие мероприятия</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="flex items-start space-x-3 p-2 border rounded-lg">
                        <div className={`w-3 h-3 rounded-full mt-1 ${event.color}`} />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{event.title}</p>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                            <Clock className="h-3 w-3" />
                            <span>{event.time}</span>
                          </div>
                          <Badge variant="outline" className={`text-xs mt-1 ${getPriorityColor(event.priority)}`}>
                            {getEventTypeLabel(event.type)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="week">
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Недельный вид календаря</p>
                <p className="text-sm">Функция в разработке</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="day">
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Дневной вид календаря</p>
                <p className="text-sm">Функция в разработке</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
