/* Horario original. Las copias editables se guardan por separado. */
window.Horario = {};
Horario.days = ["lunes","martes","miércoles","jueves","viernes","sábado","domingo"];
Horario.dayLabels = ["LUN","MAR","MIÉ","JUE","VIE","SÁB","DOM"];
Horario.palette = {
  "class-stats": [
    "Estadística Aplicada",
    "#d6ebcb",
    "#527c3e",
    "#38562c"
  ],
  "class-algo": [
    "Algoritmia y Estructuras",
    "#dce8fa",
    "#648dc1",
    "#3d5b85"
  ],
  "class-operations": [
    "Investigación de Operaciones",
    "#fae1c6",
    "#cc9459",
    "#926438"
  ],
  "class-requirements": [
    "Ingeniería de Requerimientos",
    "#e8dcf5",
    "#a088be",
    "#6f568a"
  ],
  "class-poo": [
    "POO / Lenguaje de Programación",
    "#d3ece7",
    "#64a89b",
    "#3d7c70"
  ],
  "class-architecture": [
    "Arquitectura de Computadoras II",
    "#f4dce5",
    "#c18c9f",
    "#95596e"
  ],
  "study-stats": [
    "Estudio de Estadística",
    "#edf4df",
    "#83a65c",
    "#59723f"
  ],
  "study": [
    "Estudio de otros cursos",
    "#eaf1fb",
    "#96b4d3",
    "#597796"
  ],
  "projects": [
    "Proyectos personales",
    "#faf0c9",
    "#c7b15c",
    "#8b7938"
  ],
  "gym": [
    "Gimnasio",
    "#f7dfd9",
    "#c88979",
    "#935d50"
  ],
  "food": [
    "Comidas",
    "#fbefde",
    "#d2b48d",
    "#947b57"
  ],
  "hygiene": [
    "Aseo / preparación",
    "#eaf3f6",
    "#a2c2cb",
    "#65818b"
  ],
  "transport": [
    "Transporte",
    "#edf0ed",
    "#b0bab1",
    "#738076"
  ],
  "rest": [
    "Descanso / tiempo libre",
    "#f0edf5",
    "#beb3cd",
    "#857493"
  ],
  "sleep": [
    "Dormir",
    "#d8dfef",
    "#7e8fab",
    "#506282"
  ],
  "chores": [
    "Lavar ropa / ordenar",
    "#eee7db",
    "#baab91",
    "#88765a"
  ],
  "planning": [
    "Planificación semanal",
    "#f6f1d7",
    "#c4b86c",
    "#8c8044"
  ]
};
Horario.defaults = [
  {
    "id": "original-1",
    "day": "lunes",
    "start": "08:00",
    "end": "08:30",
    "title": "Aseo personal",
    "subtitle": "Actividad personal",
    "category": "aseo",
    "course": ""
  },
  {
    "id": "original-2",
    "day": "lunes",
    "start": "08:30",
    "end": "09:00",
    "title": "Desayuno",
    "subtitle": "Actividad personal",
    "category": "comidas",
    "course": ""
  },
  {
    "id": "original-3",
    "day": "lunes",
    "start": "09:00",
    "end": "10:30",
    "title": "Estadística Aplicada",
    "subtitle": "Estudio individual",
    "category": "estadistica",
    "course": ""
  },
  {
    "id": "original-4",
    "day": "lunes",
    "start": "10:30",
    "end": "10:45",
    "title": "Descanso",
    "subtitle": "Actividad personal",
    "category": "descanso",
    "course": ""
  },
  {
    "id": "original-5",
    "day": "lunes",
    "start": "10:45",
    "end": "12:15",
    "title": "Algoritmia y Estructuras",
    "subtitle": "Estudio individual",
    "category": "estudio",
    "course": ""
  },
  {
    "id": "original-6",
    "day": "lunes",
    "start": "12:15",
    "end": "13:00",
    "title": "Tiempo libre",
    "subtitle": "Actividad personal",
    "category": "descanso",
    "course": ""
  },
  {
    "id": "original-7",
    "day": "lunes",
    "start": "13:00",
    "end": "14:00",
    "title": "Almuerzo",
    "subtitle": "Actividad personal",
    "category": "comidas",
    "course": ""
  },
  {
    "id": "original-8",
    "day": "lunes",
    "start": "14:00",
    "end": "15:30",
    "title": "Proyectos personales",
    "subtitle": "Proyecto personal",
    "category": "proyectos",
    "course": ""
  },
  {
    "id": "original-9",
    "day": "lunes",
    "start": "15:30",
    "end": "16:00",
    "title": "Descanso",
    "subtitle": "Actividad personal",
    "category": "descanso",
    "course": ""
  },
  {
    "id": "original-10",
    "day": "lunes",
    "start": "16:00",
    "end": "16:45",
    "title": "Repaso / pendientes",
    "subtitle": "Repaso",
    "category": "estudio",
    "course": ""
  },
  {
    "id": "original-11",
    "day": "lunes",
    "start": "16:45",
    "end": "17:15",
    "title": "Prepararse",
    "subtitle": "Actividad personal",
    "category": "aseo",
    "course": ""
  },
  {
    "id": "original-12",
    "day": "lunes",
    "start": "17:15",
    "end": "17:45",
    "title": "Viaje a UNI",
    "subtitle": "Actividad personal",
    "category": "transporte",
    "course": ""
  },
  {
    "id": "original-13",
    "day": "lunes",
    "start": "18:00",
    "end": "22:00",
    "title": "Algoritmia y Estructuras de Datos",
    "subtitle": "Clase universitaria",
    "category": "clase",
    "course": "algo"
  },
  {
    "id": "original-14",
    "day": "lunes",
    "start": "22:00",
    "end": "22:30",
    "title": "Regreso a casa",
    "subtitle": "Actividad personal",
    "category": "transporte",
    "course": ""
  },
  {
    "id": "original-15",
    "day": "lunes",
    "start": "22:30",
    "end": "23:00",
    "title": "Cena",
    "subtitle": "Actividad personal",
    "category": "comidas",
    "course": ""
  },
  {
    "id": "original-16",
    "day": "lunes",
    "start": "23:00",
    "end": "23:30",
    "title": "Aseo / relajarse",
    "subtitle": "Actividad personal",
    "category": "aseo",
    "course": ""
  },
  {
    "id": "original-17",
    "day": "lunes",
    "start": "23:30",
    "end": "00:00",
    "title": "Tiempo libre",
    "subtitle": "Actividad personal",
    "category": "descanso",
    "course": ""
  },
  {
    "id": "original-18",
    "day": "martes",
    "start": "08:00",
    "end": "08:30",
    "title": "Aseo personal",
    "subtitle": "Actividad personal",
    "category": "aseo",
    "course": ""
  },
  {
    "id": "original-19",
    "day": "martes",
    "start": "08:30",
    "end": "09:00",
    "title": "Desayuno",
    "subtitle": "Actividad personal",
    "category": "comidas",
    "course": ""
  },
  {
    "id": "original-20",
    "day": "martes",
    "start": "09:00",
    "end": "11:00",
    "title": "Estadística Aplicada",
    "subtitle": "Estudio profundo",
    "category": "estadistica",
    "course": ""
  },
  {
    "id": "original-21",
    "day": "martes",
    "start": "11:00",
    "end": "11:20",
    "title": "Descanso",
    "subtitle": "Actividad personal",
    "category": "descanso",
    "course": ""
  },
  {
    "id": "original-22",
    "day": "martes",
    "start": "11:20",
    "end": "12:20",
    "title": "Investigación de Operaciones",
    "subtitle": "Estudio individual",
    "category": "estudio",
    "course": ""
  },
  {
    "id": "original-23",
    "day": "martes",
    "start": "12:20",
    "end": "13:00",
    "title": "Almuerzo",
    "subtitle": "Actividad personal",
    "category": "comidas",
    "course": ""
  },
  {
    "id": "original-24",
    "day": "martes",
    "start": "13:00",
    "end": "13:30",
    "title": "Viaje a UNI",
    "subtitle": "Actividad personal",
    "category": "transporte",
    "course": ""
  },
  {
    "id": "original-25",
    "day": "martes",
    "start": "14:00",
    "end": "16:00",
    "title": "Estadística Aplicada",
    "subtitle": "Clase universitaria",
    "category": "clase",
    "course": "stats"
  },
  {
    "id": "original-26",
    "day": "martes",
    "start": "16:00",
    "end": "18:00",
    "title": "Investigación de Operaciones I",
    "subtitle": "Clase universitaria",
    "category": "clase",
    "course": "operations"
  },
  {
    "id": "original-27",
    "day": "martes",
    "start": "18:00",
    "end": "18:20",
    "title": "Traslado facultad → gimnasio",
    "subtitle": "Actividad personal",
    "category": "transporte",
    "course": ""
  },
  {
    "id": "original-28",
    "day": "martes",
    "start": "18:20",
    "end": "19:40",
    "title": "Gimnasio",
    "subtitle": "Entrenamiento",
    "category": "gimnasio",
    "course": ""
  },
  {
    "id": "original-29",
    "day": "martes",
    "start": "19:40",
    "end": "20:00",
    "title": "Ducha / cambio",
    "subtitle": "Actividad personal",
    "category": "aseo",
    "course": ""
  },
  {
    "id": "original-30",
    "day": "martes",
    "start": "20:00",
    "end": "20:30",
    "title": "Regreso a casa",
    "subtitle": "Actividad personal",
    "category": "transporte",
    "course": ""
  },
  {
    "id": "original-31",
    "day": "martes",
    "start": "20:30",
    "end": "21:15",
    "title": "Cena",
    "subtitle": "Actividad personal",
    "category": "comidas",
    "course": ""
  },
  {
    "id": "original-32",
    "day": "martes",
    "start": "21:15",
    "end": "21:45",
    "title": "Estadística de lo visto hoy",
    "subtitle": "Repaso",
    "category": "estadistica",
    "course": ""
  },
  {
    "id": "original-33",
    "day": "martes",
    "start": "21:45",
    "end": "23:30",
    "title": "Tiempo libre",
    "subtitle": "Actividad personal",
    "category": "descanso",
    "course": ""
  },
  {
    "id": "original-34",
    "day": "martes",
    "start": "23:30",
    "end": "00:00",
    "title": "Prepararse para dormir",
    "subtitle": "Actividad personal",
    "category": "aseo",
    "course": ""
  },
  {
    "id": "original-35",
    "day": "miércoles",
    "start": "08:00",
    "end": "08:30",
    "title": "Aseo personal",
    "subtitle": "Actividad personal",
    "category": "aseo",
    "course": ""
  },
  {
    "id": "original-36",
    "day": "miércoles",
    "start": "08:30",
    "end": "09:00",
    "title": "Desayuno",
    "subtitle": "Actividad personal",
    "category": "comidas",
    "course": ""
  },
  {
    "id": "original-37",
    "day": "miércoles",
    "start": "09:15",
    "end": "09:45",
    "title": "Viaje a UNI",
    "subtitle": "Actividad personal",
    "category": "transporte",
    "course": ""
  },
  {
    "id": "original-38",
    "day": "miércoles",
    "start": "10:00",
    "end": "14:00",
    "title": "Ingeniería de Requerimientos I",
    "subtitle": "Clase universitaria",
    "category": "clase",
    "course": "requirements"
  },
  {
    "id": "original-39",
    "day": "miércoles",
    "start": "14:00",
    "end": "14:45",
    "title": "Almuerzo",
    "subtitle": "Actividad personal",
    "category": "comidas",
    "course": ""
  },
  {
    "id": "original-40",
    "day": "miércoles",
    "start": "14:45",
    "end": "16:15",
    "title": "Ingeniería de Requerimientos",
    "subtitle": "Biblioteca",
    "category": "estudio",
    "course": ""
  },
  {
    "id": "original-41",
    "day": "miércoles",
    "start": "16:15",
    "end": "16:35",
    "title": "Traslado al gimnasio",
    "subtitle": "Actividad personal",
    "category": "transporte",
    "course": ""
  },
  {
    "id": "original-42",
    "day": "miércoles",
    "start": "16:35",
    "end": "17:45",
    "title": "Gimnasio",
    "subtitle": "Entrenamiento",
    "category": "gimnasio",
    "course": ""
  },
  {
    "id": "original-43",
    "day": "miércoles",
    "start": "17:45",
    "end": "18:10",
    "title": "Ducha / cambio",
    "subtitle": "Actividad personal",
    "category": "aseo",
    "course": ""
  },
  {
    "id": "original-44",
    "day": "miércoles",
    "start": "18:10",
    "end": "18:40",
    "title": "Comer / descansar",
    "subtitle": "Actividad personal",
    "category": "comidas",
    "course": ""
  },
  {
    "id": "original-45",
    "day": "miércoles",
    "start": "18:40",
    "end": "19:00",
    "title": "Traslado a facultad",
    "subtitle": "Actividad personal",
    "category": "transporte",
    "course": ""
  },
  {
    "id": "original-46",
    "day": "miércoles",
    "start": "19:00",
    "end": "22:00",
    "title": "POO / Lenguaje de Programación",
    "subtitle": "Clase universitaria",
    "category": "clase",
    "course": "poo"
  },
  {
    "id": "original-47",
    "day": "miércoles",
    "start": "22:00",
    "end": "22:30",
    "title": "Regreso a casa",
    "subtitle": "Actividad personal",
    "category": "transporte",
    "course": ""
  },
  {
    "id": "original-48",
    "day": "miércoles",
    "start": "22:30",
    "end": "23:00",
    "title": "Cena",
    "subtitle": "Actividad personal",
    "category": "comidas",
    "course": ""
  },
  {
    "id": "original-49",
    "day": "miércoles",
    "start": "23:00",
    "end": "23:30",
    "title": "Relajarse",
    "subtitle": "Actividad personal",
    "category": "descanso",
    "course": ""
  },
  {
    "id": "original-50",
    "day": "jueves",
    "start": "08:00",
    "end": "08:30",
    "title": "Aseo personal",
    "subtitle": "Actividad personal",
    "category": "aseo",
    "course": ""
  },
  {
    "id": "original-51",
    "day": "jueves",
    "start": "08:30",
    "end": "09:00",
    "title": "Desayuno",
    "subtitle": "Actividad personal",
    "category": "comidas",
    "course": ""
  },
  {
    "id": "original-52",
    "day": "jueves",
    "start": "09:00",
    "end": "11:00",
    "title": "Estadística",
    "subtitle": "Estudio profundo",
    "category": "estadistica",
    "course": ""
  },
  {
    "id": "original-53",
    "day": "jueves",
    "start": "11:00",
    "end": "11:20",
    "title": "Descanso",
    "subtitle": "Actividad personal",
    "category": "descanso",
    "course": ""
  },
  {
    "id": "original-54",
    "day": "jueves",
    "start": "11:20",
    "end": "12:50",
    "title": "Poo",
    "subtitle": "Estudio individual",
    "category": "estudio",
    "course": ""
  },
  {
    "id": "original-55",
    "day": "jueves",
    "start": "12:50",
    "end": "13:40",
    "title": "Almuerzo",
    "subtitle": "Actividad personal",
    "category": "comidas",
    "course": ""
  },
  {
    "id": "original-56",
    "day": "jueves",
    "start": "13:40",
    "end": "14:40",
    "title": "Proyectos personales",
    "subtitle": "Proyecto personal",
    "category": "proyectos",
    "course": ""
  },
  {
    "id": "original-57",
    "day": "jueves",
    "start": "14:40",
    "end": "15:10",
    "title": "Prepararse",
    "subtitle": "Actividad personal",
    "category": "aseo",
    "course": ""
  },
  {
    "id": "original-58",
    "day": "jueves",
    "start": "15:10",
    "end": "15:40",
    "title": "Viaje a UNI",
    "subtitle": "Actividad personal",
    "category": "transporte",
    "course": ""
  },
  {
    "id": "original-59",
    "day": "jueves",
    "start": "16:00",
    "end": "18:00",
    "title": "Investigación de Operaciones",
    "subtitle": "Clase universitaria",
    "category": "clase",
    "course": "operations"
  },
  {
    "id": "original-60",
    "day": "jueves",
    "start": "18:00",
    "end": "19:00",
    "title": "Cena / descanso en UNI",
    "subtitle": "Actividad personal",
    "category": "comidas",
    "course": ""
  },
  {
    "id": "original-61",
    "day": "jueves",
    "start": "19:00",
    "end": "22:00",
    "title": "POO / Lenguaje de Programación",
    "subtitle": "Clase universitaria",
    "category": "clase",
    "course": "poo"
  },
  {
    "id": "original-62",
    "day": "jueves",
    "start": "22:00",
    "end": "22:30",
    "title": "Regreso",
    "subtitle": "Actividad personal",
    "category": "transporte",
    "course": ""
  },
  {
    "id": "original-63",
    "day": "jueves",
    "start": "22:30",
    "end": "23:00",
    "title": "Ducha / snack",
    "subtitle": "Actividad personal",
    "category": "aseo",
    "course": ""
  },
  {
    "id": "original-64",
    "day": "jueves",
    "start": "23:00",
    "end": "23:45",
    "title": "Tiempo libre",
    "subtitle": "Actividad personal",
    "category": "descanso",
    "course": ""
  },
  {
    "id": "original-65",
    "day": "viernes",
    "start": "08:00",
    "end": "08:30",
    "title": "Aseo personal",
    "subtitle": "Actividad personal",
    "category": "aseo",
    "course": ""
  },
  {
    "id": "original-66",
    "day": "viernes",
    "start": "08:30",
    "end": "09:00",
    "title": "Desayuno",
    "subtitle": "Actividad personal",
    "category": "comidas",
    "course": ""
  },
  {
    "id": "original-67",
    "day": "viernes",
    "start": "09:00",
    "end": "10:30",
    "title": "Estadística — problemas difíciles",
    "subtitle": "Estudio profundo",
    "category": "estadistica",
    "course": ""
  },
  {
    "id": "original-68",
    "day": "viernes",
    "start": "10:30",
    "end": "10:45",
    "title": "Descanso",
    "subtitle": "Actividad personal",
    "category": "descanso",
    "course": ""
  },
  {
    "id": "original-69",
    "day": "viernes",
    "start": "10:45",
    "end": "12:15",
    "title": "Proyectos personales",
    "subtitle": "Proyecto personal",
    "category": "proyectos",
    "course": ""
  },
  {
    "id": "original-70",
    "day": "viernes",
    "start": "12:15",
    "end": "13:00",
    "title": "Almuerzo",
    "subtitle": "Actividad personal",
    "category": "comidas",
    "course": ""
  },
  {
    "id": "original-71",
    "day": "viernes",
    "start": "13:00",
    "end": "13:30",
    "title": "Viaje a UNI",
    "subtitle": "Actividad personal",
    "category": "transporte",
    "course": ""
  },
  {
    "id": "original-72",
    "day": "viernes",
    "start": "14:00",
    "end": "16:00",
    "title": "Estadística Aplicada",
    "subtitle": "Clase universitaria",
    "category": "clase",
    "course": "stats"
  },
  {
    "id": "original-73",
    "day": "viernes",
    "start": "16:00",
    "end": "16:20",
    "title": "Traslado al gimnasio",
    "subtitle": "Actividad personal",
    "category": "transporte",
    "course": ""
  },
  {
    "id": "original-74",
    "day": "viernes",
    "start": "16:20",
    "end": "17:40",
    "title": "Gimnasio",
    "subtitle": "Entrenamiento",
    "category": "gimnasio",
    "course": ""
  },
  {
    "id": "original-75",
    "day": "viernes",
    "start": "17:40",
    "end": "18:00",
    "title": "Ducha",
    "subtitle": "Actividad personal",
    "category": "aseo",
    "course": ""
  },
  {
    "id": "original-76",
    "day": "viernes",
    "start": "18:00",
    "end": "18:30",
    "title": "Regreso",
    "subtitle": "Actividad personal",
    "category": "transporte",
    "course": ""
  },
  {
    "id": "original-77",
    "day": "viernes",
    "start": "18:30",
    "end": "19:15",
    "title": "Cena",
    "subtitle": "Actividad personal",
    "category": "comidas",
    "course": ""
  },
  {
    "id": "original-78",
    "day": "viernes",
    "start": "19:15",
    "end": "20:00",
    "title": "Estadística",
    "subtitle": "Repaso",
    "category": "estadistica",
    "course": ""
  },
  {
    "id": "original-79",
    "day": "viernes",
    "start": "20:00",
    "end": "00:00",
    "title": "Tiempo libre",
    "subtitle": "Actividad personal",
    "category": "descanso",
    "course": ""
  },
  {
    "id": "original-80",
    "day": "sábado",
    "start": "06:30",
    "end": "07:00",
    "title": "Aseo personal",
    "subtitle": "Actividad personal",
    "category": "aseo",
    "course": ""
  },
  {
    "id": "original-81",
    "day": "sábado",
    "start": "07:00",
    "end": "07:20",
    "title": "Desayuno",
    "subtitle": "Actividad personal",
    "category": "comidas",
    "course": ""
  },
  {
    "id": "original-82",
    "day": "sábado",
    "start": "07:20",
    "end": "07:50",
    "title": "Viaje a UNI",
    "subtitle": "Actividad personal",
    "category": "transporte",
    "course": ""
  },
  {
    "id": "original-83",
    "day": "sábado",
    "start": "08:00",
    "end": "12:00",
    "title": "Arquitectura de Computadoras II",
    "subtitle": "Clase universitaria",
    "category": "clase",
    "course": "architecture"
  },
  {
    "id": "original-84",
    "day": "sábado",
    "start": "12:00",
    "end": "12:30",
    "title": "Regreso",
    "subtitle": "Actividad personal",
    "category": "transporte",
    "course": ""
  },
  {
    "id": "original-85",
    "day": "sábado",
    "start": "12:30",
    "end": "13:30",
    "title": "Almuerzo",
    "subtitle": "Actividad personal",
    "category": "comidas",
    "course": ""
  },
  {
    "id": "original-86",
    "day": "sábado",
    "start": "13:30",
    "end": "14:30",
    "title": "Descanso / siesta",
    "subtitle": "Actividad personal",
    "category": "descanso",
    "course": ""
  },
  {
    "id": "original-87",
    "day": "sábado",
    "start": "14:30",
    "end": "16:00",
    "title": "Arquitectura",
    "subtitle": "Estudio individual",
    "category": "estudio",
    "course": ""
  },
  {
    "id": "original-88",
    "day": "sábado",
    "start": "16:00",
    "end": "17:30",
    "title": "Lavar ropa + ordenar habitación",
    "subtitle": "Actividad personal",
    "category": "personal",
    "course": ""
  },
  {
    "id": "original-89",
    "day": "sábado",
    "start": "17:30",
    "end": "18:00",
    "title": "Aseo",
    "subtitle": "Actividad personal",
    "category": "aseo",
    "course": ""
  },
  {
    "id": "original-90",
    "day": "sábado",
    "start": "18:00",
    "end": "23:30",
    "title": "Tiempo libre",
    "subtitle": "Actividad personal",
    "category": "descanso",
    "course": ""
  },
  {
    "id": "original-91",
    "day": "domingo",
    "start": "08:30",
    "end": "09:00",
    "title": "Aseo personal",
    "subtitle": "Actividad personal",
    "category": "aseo",
    "course": ""
  },
  {
    "id": "original-92",
    "day": "domingo",
    "start": "09:00",
    "end": "09:30",
    "title": "Desayuno",
    "subtitle": "Actividad personal",
    "category": "comidas",
    "course": ""
  },
  {
    "id": "original-93",
    "day": "domingo",
    "start": "09:30",
    "end": "11:30",
    "title": "Estadística",
    "subtitle": "Estudio profundo",
    "category": "estadistica",
    "course": ""
  },
  {
    "id": "original-94",
    "day": "domingo",
    "start": "11:30",
    "end": "12:00",
    "title": "Descanso",
    "subtitle": "Actividad personal",
    "category": "descanso",
    "course": ""
  },
  {
    "id": "original-95",
    "day": "domingo",
    "start": "12:00",
    "end": "13:00",
    "title": "Algoritmia o POO",
    "subtitle": "Estudio individual",
    "category": "estudio",
    "course": ""
  },
  {
    "id": "original-96",
    "day": "domingo",
    "start": "13:00",
    "end": "14:00",
    "title": "Almuerzo",
    "subtitle": "Actividad personal",
    "category": "comidas",
    "course": ""
  },
  {
    "id": "original-97",
    "day": "domingo",
    "start": "14:00",
    "end": "15:30",
    "title": "Descanso",
    "subtitle": "Actividad personal",
    "category": "descanso",
    "course": ""
  },
  {
    "id": "original-98",
    "day": "domingo",
    "start": "15:30",
    "end": "17:00",
    "title": "Proyectos personales",
    "subtitle": "Proyecto personal",
    "category": "proyectos",
    "course": ""
  },
  {
    "id": "original-99",
    "day": "domingo",
    "start": "17:00",
    "end": "18:00",
    "title": "Tiempo libre",
    "subtitle": "Actividad personal",
    "category": "descanso",
    "course": ""
  },
  {
    "id": "original-100",
    "day": "domingo",
    "start": "18:00",
    "end": "18:45",
    "title": "Planificación de la semana",
    "subtitle": "Actividad personal",
    "category": "planificacion",
    "course": ""
  },
  {
    "id": "original-101",
    "day": "domingo",
    "start": "18:45",
    "end": "19:30",
    "title": "Cena",
    "subtitle": "Actividad personal",
    "category": "comidas",
    "course": ""
  },
  {
    "id": "original-102",
    "day": "domingo",
    "start": "19:30",
    "end": "22:30",
    "title": "Tiempo libre",
    "subtitle": "Actividad personal",
    "category": "descanso",
    "course": ""
  },
  {
    "id": "original-103",
    "day": "domingo",
    "start": "22:30",
    "end": "23:00",
    "title": "Preparar mochila y ropa",
    "subtitle": "Actividad personal",
    "category": "aseo",
    "course": ""
  },
  {
    "id": "sleep-0",
    "day": "martes",
    "start": "00:00",
    "end": "08:00",
    "title": "Dormir",
    "subtitle": "Descanso nocturno",
    "category": "dormir",
    "course": ""
  },
  {
    "id": "sleep-1",
    "day": "miércoles",
    "start": "00:00",
    "end": "08:00",
    "title": "Dormir",
    "subtitle": "Descanso nocturno",
    "category": "dormir",
    "course": ""
  },
  {
    "id": "sleep-2",
    "day": "miércoles",
    "start": "23:45",
    "end": "08:00",
    "title": "Dormir",
    "subtitle": "Descanso nocturno",
    "category": "dormir",
    "course": ""
  },
  {
    "id": "sleep-3",
    "day": "jueves",
    "start": "23:45",
    "end": "08:00",
    "title": "Dormir",
    "subtitle": "Descanso nocturno",
    "category": "dormir",
    "course": ""
  },
  {
    "id": "sleep-4",
    "day": "sábado",
    "start": "00:00",
    "end": "06:30",
    "title": "Dormir",
    "subtitle": "Descanso nocturno",
    "category": "dormir",
    "course": ""
  },
  {
    "id": "sleep-5",
    "day": "sábado",
    "start": "23:30",
    "end": "08:30",
    "title": "Dormir",
    "subtitle": "Descanso nocturno",
    "category": "dormir",
    "course": ""
  },
  {
    "id": "sleep-6",
    "day": "domingo",
    "start": "23:30",
    "end": "08:00",
    "title": "Dormir",
    "subtitle": "Descanso nocturno",
    "category": "dormir",
    "course": ""
  }
];
