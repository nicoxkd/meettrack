src/app/
│
├── core/                          # Código esencial global del proyecto
│   ├── models/                     # Modelos globales (User, ApiResponse, etc.)
│   ├── services/                   # Servicios singleton (AuthService, TokenService)
│   ├── guards/                     # Guards de routing globales (AuthGuard, RoleGuard)
│   └── interceptors/               # Interceptors HTTP globales (AuthInterceptor, ErrorInterceptor)
│
├── shared/                        # Recursos reutilizables entre features
│   ├── components/                 # Componentes UI reutilizables (Button, Modal, Spinner)
│   ├── directives/                 # Directivas personalizadas (ClickOutside, Debounce)
│   ├── pipes/                      # Pipes reutilizables (DateFormat, Truncate)
│   └── utils/                      # Funciones helper y constantes globales (Validators, StringUtils)
│
├── features/                     # Módulos funcionales siguiendo MVVM
│   ├── auth/                      # Autenticación
│   │   ├── views/                  # Componentes visibles (LoginComponent, RegisterComponent)
│   │   ├── viewmodels/             # Lógica de la vista (LoginViewModel)
│   │   ├── services/               # Servicios propios de auth (AuthService)
│   │   └── models/                 # Modelos propios de auth (LoginModel, RegisterModel)
│   │
│   ├── dashboard/                 # Panel principal
│   │   ├── views/                  # Componentes de interfaz (DashboardComponent, Widgets)
│   │   ├── viewmodels/             # Lógica del dashboard (DashboardViewModel)
│   │   ├── services/               # Servicios específicos (DashboardService)
│   │   └── models/                 # Modelos del dashboard (WidgetModel)
│   │
│   ├── reuniones/                 # Gestión de reuniones
│   │   ├── views/                  # Componentes (ListaReuniones, FormReunion)
│   │   ├── viewmodels/             # Lógica de la vista (ReunionesViewModel)
│   │   ├── services/               # Servicios propios (ReunionesService)
│   │   └── models/                 # Modelos de reuniones (ReunionModel)
│   │
│   ├── actas/                     # Gestión de actas
│   │   ├── views/                  # Componentes (ListaActas, ActaDetalle)
│   │   ├── viewmodels/             # Lógica de la vista (ActasViewModel)
│   │   ├── services/               # Servicios específicos (ActasService, IAService)
│   │   └── models/                 # Modelos de actas (ActaModel)
│   │
│   └── usuarios/                  # Gestión de usuarios
│       ├── views/                  # Componentes (ListaUsuarios, PerfilUsuario)
│       ├── viewmodels/             # Lógica de la vista (UsuariosViewModel)
│       ├── services/               # Servicios propios (UsuariosService)
│       └── models/                 # Modelos de usuarios (UsuarioModel)
│
└── assets/                        # Recursos estáticos
    ├── icons/                      # Iconos de la aplicación
    ├── img/                        # Imágenes (logotipos, ilustraciones)
    ├── styles/                     # Estilos globales y variables SCSS/CSS
    └── fonts/                      # Tipografías utilizadas en la app
