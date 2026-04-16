import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Youtube, Instagram, ChevronDown } from "lucide-react"
import { AnimatedText } from "@/components/animated-text"
import Icon from "@/components/ui/icon"
import { WorldMap } from "@/components/world-map"
import { experiences } from "@/lib/experience-data"
import type { Experience } from "@/lib/experience-data"

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState("0")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const numericStr = value.replace(/[^0-9.]/g, "")
          const targetNum = Number.parseFloat(numericStr)
          const unit = value.replace(/[0-9.]/g, "")

          let current = 0
          const increment = targetNum / 60
          const interval = setInterval(() => {
            current += increment
            if (current >= targetNum) {
              setDisplayValue(`${targetNum}${unit}`)
              clearInterval(interval)
            } else {
              setDisplayValue(`${current.toFixed(1)}${unit}`.replace(".0", ""))
            }
          }, 16)

          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div className="text-8xl" ref={ref}>
      {displayValue}
    </div>
  )
}

export default function VerdantPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [selectedFeature, setSelectedFeature] = useState(0)
  const [imageFade, setImageFade] = useState(true)
  const [autoRotationKey, setAutoRotationKey] = useState(0)
  const [dynamicWordIndex, setDynamicWordIndex] = useState(0)
  const [wordFade, setWordFade] = useState(true)
  const [dashboardScrollOffset, setDashboardScrollOffset] = useState(0)
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const dashboardRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const dynamicWords = ["золото", "украшения", "бриллианты", "серебро", "кольца", "цепочки", "монеты"]

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordFade(false)
      setTimeout(() => {
        setDynamicWordIndex((prev) => (prev + 1) % dynamicWords.length)
        setWordFade(true)
      }, 300)
    }, 3000)

    return () => clearInterval(wordInterval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      if (dashboardRef.current) {
        const dashboardRect = dashboardRef.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight

        const rotationStart = viewportHeight * 0.8
        const rotationEnd = viewportHeight * 0.2

        if (dashboardRect.top >= rotationStart) {
          setDashboardScrollOffset(0)
        } else if (dashboardRect.top <= rotationEnd) {
          setDashboardScrollOffset(15)
        } else {
          const scrollRange = rotationStart - rotationEnd
          const currentProgress = rotationStart - dashboardRect.top
          const rotationProgress = currentProgress / scrollRange
          const tiltAngle = rotationProgress * 15
          setDashboardScrollOffset(tiltAngle)
        }
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsLoaded(true)

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  useEffect(() => {
    const featuresCount = 4

    const interval = setInterval(() => {
      setImageFade(false)
      setTimeout(() => {
        setSelectedFeature((prev) => (prev + 1) % featuresCount)
        setImageFade(true)
      }, 300)
    }, 6000)

    return () => clearInterval(interval)
  }, [autoRotationKey])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const featureImages = [
    "https://cdn.poehali.dev/projects/4ee05460-2fe5-4e11-88f6-861e898e85a0/files/67a6603f-4ada-4b4d-92a9-eb884ce6c406.jpg",
    "https://cdn.poehali.dev/projects/4ee05460-2fe5-4e11-88f6-861e898e85a0/files/e67d86e4-7862-4260-bda0-3d39729b2df8.jpg",
    "https://cdn.poehali.dev/projects/4ee05460-2fe5-4e11-88f6-861e898e85a0/files/67a6603f-4ada-4b4d-92a9-eb884ce6c406.jpg",
    "https://cdn.poehali.dev/projects/4ee05460-2fe5-4e11-88f6-861e898e85a0/files/e67d86e4-7862-4260-bda0-3d39729b2df8.jpg",
  ]

  return (
    <div className="relative min-h-screen bg-[#0B0C0F] text-[#F2F3F5] overflow-x-hidden">
      <header className="fixed top-6 left-6 md:w-auto md:right-auto right-6 z-40 border border-white/10 backdrop-blur-md bg-[#0B0C0F]/80 rounded-[16px]">
        <div className="w-full mx-auto px-6">
          <div className="flex items-center gap-6 md:h-14 h-14">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-lg md:text-xl font-semibold font-mono hover:text-yellow-400 transition-colors duration-300"
            >
              ЗОЛОТОЙ ВЕК
            </button>

            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("metrics")}
                className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors duration-300"
              >
                Цифры
              </button>
              <button
                onClick={() => scrollToSection("map")}
                className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors duration-300"
              >
                Адреса
              </button>
              <button
                onClick={() => scrollToSection("narrative")}
                className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors duration-300"
              >
                Как это работает
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors duration-300"
              >
                Вопросы
              </button>
              <button
                onClick={() => scrollToSection("cta")}
                className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors duration-300"
              >
                Оценить
              </button>
            </nav>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden ml-auto p-2 hover:bg-white/5 rounded-lg transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#0B0C0F]/95 backdrop-blur-md z-50 flex flex-col items-start justify-end pb-20 pt-20 px-6">
          <div className="flex flex-col gap-8 items-start text-left w-full">
            <button
              onClick={() => scrollToSection("metrics")}
              className="font-serif text-5xl md:text-7xl font-light text-[#F2F3F5] hover:text-yellow-400 transition-colors duration-300"
            >
              Цифры
            </button>
            <button
              onClick={() => scrollToSection("map")}
              className="font-serif text-5xl md:text-7xl font-light text-[#F2F3F5] hover:text-yellow-400 transition-colors duration-300"
            >
              Адреса
            </button>
            <button
              onClick={() => scrollToSection("narrative")}
              className="font-serif text-5xl md:text-7xl font-light text-[#F2F3F5] hover:text-yellow-400 transition-colors duration-300"
            >
              Как это работает
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="font-serif text-5xl md:text-7xl font-light text-[#F2F3F5] hover:text-yellow-400 transition-colors duration-300"
            >
              Вопросы
            </button>
            <button
              onClick={() => scrollToSection("cta")}
              className="font-serif text-5xl md:text-7xl font-light text-[#F2F3F5] hover:text-yellow-400 transition-colors duration-300"
            >
              Оценить
            </button>
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-end pb-16 md:pb-24 px-4 overflow-hidden"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/projects/4ee05460-2fe5-4e11-88f6-861e898e85a0/files/67a6603f-4ada-4b4d-92a9-eb884ce6c406.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            backgroundImage: `url('https://cdn.poehali.dev/projects/4ee05460-2fe5-4e11-88f6-861e898e85a0/files/67a6603f-4ada-4b4d-92a9-eb884ce6c406.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0F] via-[#0B0C0F]/70 to-transparent pointer-events-none" />

        <div
          className="max-w-[1120px] w-full mx-auto relative z-10"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        >
          <div className="text-center mb-8 md:mb-12">
            <h1 className="font-serif text-[44px] leading-[1.1] md:text-[72px] md:leading-[1.05] font-medium mb-6 text-balance">
              <span
                className={`block stagger-reveal text-7xl font-light transition-all duration-500 md:text-8xl ${
                  wordFade ? "opacity-100 blur-0" : "opacity-0 blur-lg"
                }`}
              >
                Скупаем <AnimatedText key={dynamicWordIndex} text={dynamicWords[dynamicWordIndex]} delay={0} />
              </span>
              <span className="block stagger-reveal text-7xl font-light md:text-8xl" style={{ animationDelay: "90ms" }}>
                дорого
              </span>
            </h1>
            <p
              className="text-[#A7ABB3] text-base md:text-lg max-w-[520px] mx-auto mb-8 leading-relaxed stagger-reveal text-white"
              style={{ animationDelay: "180ms" }}
            >
              Честная оценка и выгодная цена за ваше золото и украшения. Работаем быстро, выплачиваем сразу — без лишних формальностей.
            </p>
            <div className="stagger-reveal" style={{ animationDelay: "270ms" }}>
              <Button
                onClick={() => scrollToSection("cta")}
                className="glass-button px-8 py-6 text-base rounded-full bg-yellow-500/10 border border-yellow-400/30 hover:bg-yellow-500/20 hover:border-yellow-400/50 transition-all duration-300 text-yellow-100"
              >
                Узнать стоимость
              </Button>
            </div>
          </div>

          <div className="mt-12 md:mt-20 stagger-reveal" style={{ animationDelay: "360ms" }} ref={dashboardRef}>
            <div style={{ perspective: "1200px" }}>
              <div
                className="relative aspect-[16/10] md:aspect-[16/9] rounded-[24px] overflow-hidden"
                style={{
                  transform: `rotateX(${dashboardScrollOffset}deg)`,
                  transformStyle: "preserve-3d",
                  transition: "transform 0.05s linear",
                }}
              >
                <img
                  src="https://cdn.poehali.dev/projects/4ee05460-2fe5-4e11-88f6-861e898e85a0/files/e67d86e4-7862-4260-bda0-3d39729b2df8.jpg"
                  alt="Скупка золота и драгоценностей"
                  className="object-cover dashboard-image w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners / Trust bar */}
      <section className="relative py-12 border-y border-white/5 bg-[#0B0C0F] overflow-hidden md:py-8 md:pt-8 md:pb-4">
        <div className="w-full">
          <p className="text-center text-xs md:text-sm uppercase tracking-[0.2em] text-[#A7ABB3] mb-8">
            Принимаем изделия ведущих ювелирных домов
          </p>
          <div className="logo-marquee">
            <div className="logo-marquee-content">
              {[
                "/logos/frame-11.png",
                "/logos/frame-55.png",
                "/logos/frame-4.png",
                "/logos/frame-6.png",
                "/logos/frame-8.png",
                "/logos/frame-2.png",
                "/logos/frame-3.png",
                "/logos/frame-7.png",
                "/logos/frame-11.png",
                "/logos/frame-55.png",
                "/logos/frame-4.png",
                "/logos/frame-6.png",
                "/logos/frame-8.png",
                "/logos/frame-2.png",
                "/logos/frame-3.png",
                "/logos/frame-7.png",
              ].map((logo, i) => (
                <div key={i} className="px-8 md:px-12 flex items-center justify-center flex-shrink-0">
                  <img
                    src={logo || "/placeholder.svg"}
                    alt={`Логотип бренда ${i + 1}`}
                    className="h-32 md:h-24 w-auto object-contain opacity-60 hover:opacity-60 transition-all duration-300 brightness-0 invert"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section id="metrics" className="relative py-20 md:py-32 px-4 animate-on-scroll md:pt-24 md:pb-20">
        <div className="max-w-[1120px] w-full mx-auto">
          <h2 className="font-serif text-[32px] leading-[1.15] md:text-[48px] md:leading-[1.1] font-medium mb-6 md:mb-8 text-center text-balance">
            Скупаем{" "}
            <span
              className="inline-block"
              style={{
                background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              выгодно
            </span>{" "}
            и честно
          </h2>

          <p className="text-[#A7ABB3] text-sm md:text-base mb-12 md:mb-16 text-center max-w-[600px] mx-auto leading-relaxed">
            Тысячи клиентов уже убедились — у нас лучшая цена и мгновенная выплата наличными.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-[800px] mx-auto">
            {[
              { label: "ДОВОЛЬНЫХ КЛИЕНТОВ", value: "12K+", desc: "за последние 5 лет", color: "yellow" },
              { label: "ВЫПЛАЧЕНО КЛИЕНТАМ", value: "850M", desc: "рублей наличными", color: "orange" },
              { label: "СРЕДНЯЯ ОЦЕНКА", value: "4.9", desc: "из 5 звёзд на Яндексе", color: "yellow" },
              { label: "МИНУТ НА ОЦЕНКУ", value: "15", desc: "и деньги у вас", color: "orange" },
            ].map((metric, i) => (
              <div
                key={i}
                className="p-6 md:p-10 text-center border border-white/10 border-t-0 border-b border-l-0 border-r-0 md:py-10 md:pb-20"
              >
                <div
                  className={`text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-4 flex items-center justify-center gap-2`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${metric.color === "yellow" ? "bg-yellow-400/60" : "bg-orange-400/60"}`}
                  />
                  {metric.label}
                </div>
                <div className="font-serif text-[48px] md:text-[72px] leading-none font-medium">
                  <AnimatedCounter value={metric.value} />
                </div>
                <div className="text-[11px] md:text-xs text-[#A7ABB3] mt-3">{metric.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map / Locations */}
      <section id="map" className="relative py-20 md:py-32 animate-on-scroll bg-[#0B0C0F]">
        <div className="text-center mb-12 md:mb-16 px-4">
          <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-6 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            НАШИ АДРЕСА
          </div>
          <h2 className="font-serif text-[32px] leading-[1.15] md:text-[48px] md:leading-[1.1] font-medium mb-6 text-balance">
            Ближайший пункт скупки
          </h2>
          <p className="text-[#A7ABB3] text-sm md:text-base max-w-[600px] mx-auto leading-relaxed">
            Приходите в удобный для вас офис — оценим украшения сразу при вас
          </p>
        </div>

        <WorldMap
          experiences={experiences}
          selectedExperience={selectedExperience}
          onSelectExperience={setSelectedExperience}
        />
      </section>

      {/* How it works */}
      <section id="narrative" className="relative py-20 md:py-32 px-4 animate-on-scroll">
        <div className="max-w-[1120px] w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-stretch">
            <div className="max-w-[720px]">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                КАК МЫ РАБОТАЕМ
              </div>
              <h2 className="font-serif text-[36px] leading-[1.15] md:text-[56px] md:leading-[1.1] font-medium mb-8 text-balance">
                Каждое изделие{" "}
                <span
                  className="inline-block"
                  style={{
                    background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  ценно
                </span>
              </h2>
              <p className="text-[#A7ABB3] text-base md:text-lg leading-relaxed mb-12">
                Наши эксперты-оценщики с 10+ летним опытом определят точную пробу золота и рыночную стоимость прямо при вас. Никаких скрытых вычетов — только честная цена и мгновенная выплата.
              </p>

              <div className="md:hidden mb-8">
                <div className="rounded-[24px] p-1 w-full aspect-square overflow-hidden">
                  <img
                    src={featureImages[selectedFeature] || "/placeholder.svg"}
                    alt="Превью услуги"
                    className={`w-full h-full object-cover rounded-[20px] transition-opacity duration-300 ${
                      imageFade ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "Бесплатная оценка",
                    desc: "Приходите с любым изделием — оценим бесплатно и без обязательств",
                    iconName: "Scale",
                    image: featureImages[0],
                  },
                  {
                    title: "Проверка пробы",
                    desc: "Современные приборы XRF-анализа определяют состав без царапин",
                    iconName: "Microscope",
                    image: featureImages[1],
                  },
                  {
                    title: "Лучшая цена",
                    desc: "Платим по биржевому курсу золота + наша надбавка за хорошие изделия",
                    iconName: "TrendingUp",
                    image: featureImages[2],
                  },
                  {
                    title: "Деньги сразу",
                    desc: "Наличными или переводом на карту — в тот же день",
                    iconName: "Banknote",
                    image: featureImages[3],
                  },
                ].map((feature, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setImageFade(false)
                      setTimeout(() => {
                        setSelectedFeature(i)
                        setImageFade(true)
                        setAutoRotationKey((prev) => prev + 1)
                      }, 300)
                    }}
                    className={`relative w-full text-left flex gap-4 items-start p-5 transition-all duration-300 rounded-xs py-4 overflow-hidden ${
                      selectedFeature === i ? "border border-white/20" : "border border-white/10"
                    }`}
                  >
                    <Icon
                      name={feature.iconName}
                      fallback="Star"
                      className={`w-6 h-6 flex-shrink-0 mt-1 transition-colors ${
                        selectedFeature === i ? "text-yellow-400" : "text-yellow-500/60"
                      }`}
                    />
                    <div className="flex-1">
                      <h3 className="text-base md:text-lg font-medium mb-1">{feature.title}</h3>
                      <p className="text-sm md:text-base text-[#A7ABB3]">{feature.desc}</p>
                    </div>
                    {selectedFeature === i && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
                        <div className="h-full bg-yellow-400 progress-bar" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-stretch justify-center">
              <div className="relative w-full h-full min-h-[500px]">
                {featureImages.map((image, i) => {
                  const positionInStack = (i - selectedFeature + 4) % 4
                  const isActive = positionInStack === 0

                  return (
                    <div
                      key={i}
                      className="absolute inset-0 p-1 transition-all duration-600 ease-out"
                      style={{
                        zIndex: 4 - positionInStack,
                        transform: `translateX(${positionInStack * 16}px) scale(${1 - positionInStack * 0.02})`,
                        opacity: isActive ? (imageFade ? 1 : 1) : 0.6 - positionInStack * 0.15,
                      }}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Услуга ${i + 1}`}
                        className="w-full h-full object-cover rounded-[20px]"
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative py-20 md:py-32 px-4 animate-on-scroll">
        <div className="max-w-[800px] w-full mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-6 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
              ЧАСТЫЕ ВОПРОСЫ
            </div>
            <h2 className="font-serif text-[32px] leading-[1.15] md:text-[48px] md:leading-[1.1] font-medium mb-6 text-balance">
              Есть{" "}
              <span
                className="inline-block"
                style={{
                  background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                вопросы
              </span>
              ?
            </h2>
            <p className="text-[#A7ABB3] text-sm md:text-base max-w-[600px] mx-auto leading-relaxed">
              Всё, что нужно знать о скупке золота и драгоценностей.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Какое золото вы принимаете?",
                answer:
                  "Принимаем золото любой пробы: 375, 500, 583, 585, 750, 916, 950 и 999. Подходят ювелирные украшения, монеты, слитки, лом золота и даже зубные коронки. Состояние изделия не играет роли — принимаем даже сломанные украшения.",
              },
              {
                question: "Как формируется цена на скупку?",
                answer:
                  "Цена привязана к актуальному биржевому курсу золота (Лондонская биржа металлов). Мы выплачиваем до 95% от рыночной стоимости металла, что значительно выше, чем в большинстве ломбардов. Для украшений известных ювелирных домов делаем дополнительную надбавку.",
              },
              {
                question: "Нужны ли документы для сдачи золота?",
                answer:
                  "Да, по российскому законодательству требуется паспорт гражданина РФ. Для иностранных граждан — загранпаспорт с действующей визой или видом на жительство. Документы на само украшение не нужны.",
              },
              {
                question: "Сколько времени занимает оценка и выплата?",
                answer:
                  "Оценка занимает от 5 до 20 минут в зависимости от количества изделий. После вашего согласия с ценой — мгновенная выплата наличными или перевод на карту в течение 10 минут. Весь процесс, как правило, укладывается в 30 минут.",
              },
              {
                question: "Принимаете ли вы серебро и другие металлы?",
                answer:
                  "Да! Принимаем серебро (925, 875, 830 пробы), платину и палладий. Также скупаем бриллианты и крупные драгоценные камни — рубины, изумруды, сапфиры. Оценку делает профессиональный геммолог прямо на месте.",
              },
              {
                question: "Можно ли получить онлайн-оценку до визита?",
                answer:
                  "Да, пришлите фото и пробу изделия через форму на сайте или в WhatsApp — дадим предварительную оценку в течение 30 минут. Окончательная цена определяется при взвешивании и проверке изделия в офисе.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-white/20"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-base md:text-lg font-medium pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-[#A7ABB3] transition-transform duration-300 ${
                      openFaqIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaqIndex === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-6 text-sm md:text-base text-[#A7ABB3] leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="cta"
        className="relative py-24 md:py-40 px-4 animate-on-scroll overflow-hidden pt-0"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/projects/4ee05460-2fe5-4e11-88f6-861e898e85a0/files/e67d86e4-7862-4260-bda0-3d39729b2df8.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C0F] via-[#0B0C0F]/60 to-transparent pointer-events-none" />
        <div className="max-w-[800px] w-full mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 glass-pill px-4 py-2 rounded-full mb-8 text-xs md:text-sm text-[#A7ABB3]">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            Бесплатная оценка сегодня
          </div>

          <h2 className="font-serif text-[40px] leading-[1.15] md:text-[64px] md:leading-[1.1] font-medium mb-6 text-balance">
            Получите деньги за украшения прямо сейчас
          </h2>
          <p className="text-[#A7ABB3] text-base md:text-lg mb-10 leading-relaxed max-w-[560px] mx-auto">
            Оставьте заявку — перезвоним в течение 10 минут, ответим на все вопросы и запишем на удобное время.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <input
              type="tel"
              placeholder="+7 (___) ___-__-__"
              className="px-6 py-4 bg-white/5 border border-white/20 rounded-full text-base text-[#F2F3F5] placeholder-[#A7ABB3] focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/20 transition-all w-full sm:w-auto sm:min-w-[280px]"
            />
            <Button className="glass-button text-base rounded-full bg-yellow-500/20 border border-yellow-400/40 hover:bg-yellow-500/30 hover:border-yellow-400/60 transition-all duration-300 text-yellow-100 px-8 py-6 md:text-base whitespace-nowrap">
              Оценить бесплатно
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-4 border-t border-white/5 py-8">
        <div className="max-w-[1120px] w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
            <div className="flex flex-col gap-4">
              <div className="text-lg font-semibold font-mono text-yellow-400">ЗОЛОТОЙ ВЕК</div>
              <p className="text-xs text-[#A7ABB3] leading-relaxed">
                Скупка золота и драгоценностей по лучшим ценам. Работаем честно с 2010 года.
              </p>
              <div className="flex items-center gap-4 mt-2">
                <a href="#" className="text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors" aria-label="X (Twitter)">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="#" className="text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors" aria-label="YouTube">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="#" className="text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-xs uppercase tracking-[0.15em] text-[#F2F3F5] font-semibold mb-2">Услуги</div>
              <div className="flex flex-col gap-3">
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">Скупка золота</a>
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">Скупка серебра</a>
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">Бриллианты</a>
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">Монеты и слитки</a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-xs uppercase tracking-[0.15em] text-[#F2F3F5] font-semibold mb-2">Компания</div>
              <div className="flex flex-col gap-3">
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">О нас</a>
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">Отзывы</a>
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">Наши адреса</a>
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">Контакты</a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-xs uppercase tracking-[0.15em] text-[#F2F3F5] font-semibold mb-2">Онлайн-оценка</div>
              <p className="text-xs text-[#A7ABB3] mb-3">Пришлите фото — оценим за 30 минут.</p>
              <div className="flex flex-col gap-2">
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-[#F2F3F5] placeholder-[#A7ABB3] focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/20 transition-all"
                />
                <button className="px-4 py-2 border rounded-lg text-xs font-medium hover:bg-yellow-500/20 hover:border-yellow-500/40 transition-all bg-yellow-500/10 border-yellow-600/30 text-yellow-100">
                  Отправить заявку
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#A7ABB3]">
            <div>2025 Золотой Век. Все права защищены.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#F2F3F5] transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-[#F2F3F5] transition-colors">Условия использования</a>
              <a href="#" className="hover:text-[#F2F3F5] transition-colors">Лицензии</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
