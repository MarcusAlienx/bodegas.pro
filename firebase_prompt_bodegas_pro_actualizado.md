# Prompt Detallado para Firebase: Proyecto bodegas.pro

Este documento contiene un prompt completo para configurar Firebase en el proyecto bodegas.pro, incluyendo autenticación vía SMS, estructura de datos, campos personalizados, reglas de seguridad y procesos de importación desde buscabodegas.com y otros portales.

## Prompt para Gemini CLI en Visual Studio Code

```bash
gemini "
Configura un proyecto Firebase completo para una plataforma de bodegas industriales llamada bodegas.pro con las siguientes especificaciones:

## 1. CONFIGURACIÓN INICIAL

Crea un archivo de configuración de Firebase para Next.js con TypeScript usando estos valores:
- apiKey: 'AIzaSyAFcGYDTe5KJsCyxmRVqsBGdOzZMyxM8K0'
- authDomain: 'buscabodegasx.firebaseapp.com'
- projectId: 'buscabodegasx'
- storageBucket: 'buscabodegasx.firebasestorage.app'
- messagingSenderId: '402146256283'
- appId: '1:402146256283:web:154fe551422a1fdacfad3e'
- measurementId: 'G-Y6W2MCJP80'

## 2. AUTENTICACIÓN

Configura Firebase Authentication con:
- Métodos principales:
  * Email/Password
  * Google
  * Facebook
  * Autenticación por SMS/teléfono (obligatorio para brokers y clientes)

- Roles de usuario: 
  * 'visitor' (visitante): acceso limitado a propiedades públicas sin ubicación exacta
  * 'client' (cliente): puede crear consultas, guardar favoritos y ver ubicación exacta
  * 'broker' (agente inmobiliario): puede crear/editar propiedades y responder consultas
  * 'admin' (administrador): acceso completo al sistema

- Flujo de registro para brokers:
  1. Registro inicial con email/password
  2. Verificación obligatoria de email
  3. Verificación obligatoria de número telefónico vía SMS
  4. Aprobación manual por administrador

- Flujo de registro para clientes:
  1. Registro con email/password o redes sociales
  2. Verificación de número telefónico vía SMS obligatoria para acceder a propiedades exclusivas
  3. Verificación de email recomendada pero no obligatoria

- Personalización de UI para registro/login en español por defecto con opción de cambio a inglés
- Recuperación de contraseña
- Configuración de reCAPTCHA para prevenir abusos

## 3. ESTRUCTURA DE FIRESTORE

### 3.1 Colección 'users'
Crea la estructura para usuarios con los siguientes campos:
- uid: string (ID generado por Firebase Auth)
- email: string
- displayName: string
- photoURL: string (opcional)
- phoneNumber: string (obligatorio para brokers y clientes)
- phoneVerified: boolean (default: false)
- role: string (enum: 'visitor', 'client', 'broker', 'admin')
- createdAt: timestamp
- updatedAt: timestamp
- lastLogin: timestamp
- settings: {
    language: string (default: 'es'),
    theme: string (default: 'dark'),
    notifications: boolean (default: true),
    contactPreference: string (enum: 'email', 'phone', 'whatsapp')
  }
- brokerInfo: {
    company: string,
    license: string,
    phone: string,
    bio: string,
    specialties: array<string>,
    yearsOfExperience: number,
    verificationStatus: string (enum: 'pending', 'verified', 'rejected'),
    verificationDate: timestamp,
    verifiedBy: reference (a colección 'users' con role='admin')
  } (solo para role='broker')
- clientInfo: {
    phone: string,
    companyName: string (opcional),
    industry: string (opcional),
    preferences: {
      propertyTypes: array<string>,
      locations: array<string>,
      priceRange: {min: number, max: number},
      sizeRange: {min: number, max: number}
    }
  } (solo para role='client')
- accessLevel: {
    canViewExact: boolean (default: false para visitors, true para otros roles),
    canViewOwnerInfo: boolean (default: false para visitors y clients, true para brokers y admins),
    canViewAnalytics: boolean (default: false para visitors y clients, true para brokers y admins)
  }

### 3.2 Colección 'properties'
Crea la estructura para bodegas industriales con los siguientes campos:
- id: string (auto-generado)
- title: string
- slug: string (URL amigable generada desde el título)
- description: string
- shortDescription: string (máximo 200 caracteres)
- status: string (enum: 'active', 'pending', 'sold', 'rented', 'inactive')
- propertyType: string (default: 'warehouse')
- transactionType: string (enum: 'rent', 'sale')
- featured: boolean (default: false)
- verified: boolean (default: false)
- exclusive: boolean (default: false) // Propiedades exclusivas solo para usuarios registrados
- location: {
    address: string,
    city: string,
    state: string,
    zipCode: string,
    neighborhood: string,
    coordinates: {
      lat: number,
      lng: number
    },
    industrialPark: string (opcional),
    approximateLocation: { // Para mostrar a visitantes no registrados
      city: string,
      state: string,
      zone: string,
      approximateCoordinates: {
        lat: number, // Coordenadas aproximadas (redondeadas)
        lng: number
      }
    }
  }
- specs: {
    totalAreaM2: number,
    constructionAreaM2: number,
    officeAreaM2: number,
    clearHeightM: number,
    loadingDocks: number,
    parkingSpaces: number,
    powerCapacityKVA: number,
    yearBuilt: number,
    floors: number,
    buildingClass: string (enum: 'A', 'B', 'C'),
    constructionType: string,
    floorType: string,
    ceilingType: string,
    securityFeatures: array<string>,
    certifications: array<string>
  }
- amenities: {
    hasOffices: boolean,
    hasLoadingDocks: boolean,
    has24hSecurity: boolean,
    hasAlarmSystem: boolean,
    hasSprinklers: boolean,
    hasHVAC: boolean,
    hasParking: boolean,
    hasEmployeeAreas: boolean
  }
- price: {
    amount: number,
    currency: string (enum: 'MXN', 'USD'),
    period: string (enum: 'monthly', 'yearly', 'total'),
    maintenanceFee: number,
    pricePerM2: number (calculado)
  }
- media: {
    mainImage: string (URL),
    images: array<{
      url: string,
      alt: string,
      order: number
    }>,
    videos: array<string>,
    virtualTour: string (opcional),
    floorPlans: array<{
      url: string,
      description: string
    }>
  }
- seo: {
    metaTitle: string,
    metaDescription: string,
    keywords: array<string>,
    canonicalUrl: string
  }
- brokerRef: reference (a colección 'users' con role='broker')
- contactInfo: {
    public: { // Visible para todos, incluso visitantes no registrados
      email: string (default: 'info@bodegas.pro'),
      phone: string (opcional),
      contactForm: boolean (default: true)
    },
    private: { // Visible solo para usuarios registrados (clientes, brokers, admins)
      brokerName: string,
      brokerEmail: string,
      brokerPhone: string,
      brokerWhatsapp: string (opcional)
    }
  }
- ownerInfo: {
    name: string,
    phone: string,
    email: string,
    notes: string
  } (visible solo para brokers y admins)
- importSource: {
    platform: string (ej: 'buscabodegas.com', 'solili.mx', etc.),
    externalId: string,
    lastSynced: timestamp
  }
- customFields: {
    // Campos personalizados para importación y compatibilidad
    bb_id: string, // ID en buscabodegas.com
    bb_ref: string, // Referencia en buscabodegas.com
    sl_id: string, // ID en solili.mx
    sl_ref: string, // Referencia en solili.mx
    // Otros campos personalizados según origen
  }
- analytics: {
    views: number,
    favorites: number,
    inquiries: number,
    lastViewed: timestamp
  }
- createdAt: timestamp
- updatedAt: timestamp
- publishedAt: timestamp

### 3.3 Colección 'inquiries'
Crea la estructura para consultas sobre propiedades:
- id: string (auto-generado)
- propertyRef: reference (a colección 'properties')
- userRef: reference (a colección 'users', opcional si no está autenticado)
- name: string
- email: string
- phone: string
- message: string
- status: string (enum: 'new', 'inProgress', 'responded', 'closed')
- source: string (enum: 'website', 'chat', 'email', 'phone', 'whatsapp')
- brokerNotes: string (visible solo para brokers y admins)
- createdAt: timestamp
- updatedAt: timestamp
- respondedAt: timestamp (opcional)

### 3.4 Colección 'favorites'
Crea la estructura para propiedades favoritas de usuarios:
- id: string (auto-generado)
- userRef: reference (a colección 'users')
- propertyRef: reference (a colección 'properties')
- notes: string (opcional)
- createdAt: timestamp

### 3.5 Colección 'searchHistory'
Crea la estructura para historial de búsquedas:
- id: string (auto-generado)
- userRef: reference (a colección 'users', opcional)
- query: string
- filters: {
    transactionType: string,
    city: string,
    minPrice: number,
    maxPrice: number,
    minSize: number,
    maxSize: number,
    amenities: array<string>
  }
- results: number
- createdAt: timestamp

### 3.6 Colección 'importLogs'
Crea la estructura para registros de importación:
- id: string (auto-generado)
- source: string (ej: 'buscabodegas.com')
- status: string (enum: 'success', 'partial', 'failed')
- totalProperties: number
- importedProperties: number
- failedProperties: number
- errors: array<{
    propertyId: string,
    error: string
  }>
- startedAt: timestamp
- completedAt: timestamp
- executedBy: reference (a colección 'users')

### 3.7 Colección 'phoneVerifications'
Crea la estructura para verificaciones de teléfono:
- id: string (auto-generado)
- userRef: reference (a colección 'users')
- phoneNumber: string
- verificationId: string // ID generado por Firebase Phone Auth
- status: string (enum: 'pending', 'verified', 'failed')
- attempts: number
- lastAttempt: timestamp
- verifiedAt: timestamp (opcional)
- createdAt: timestamp

## 4. REGLAS DE SEGURIDAD DE FIRESTORE

Crea reglas de seguridad que implementen:

1. Acceso público limitado a propiedades activas y verificadas:
   - Visitantes no registrados solo pueden ver información básica, ubicación aproximada y contacto general
   - Ubicación exacta y contacto del broker solo visible para usuarios registrados

2. Restricción para que solo brokers y admins puedan crear/editar propiedades

3. Restricción para que los brokers solo puedan ver/editar sus propias propiedades

4. Restricción para que el campo 'ownerInfo' solo sea visible para brokers y admins

5. Restricción para que los campos en 'customFields' solo sean visibles para admins

6. Permitir a usuarios autenticados (clientes, brokers, admins) crear consultas y guardar favoritos

7. Restricción para que los brokers solo puedan ver consultas de sus propiedades

8. Acceso completo para administradores a todas las colecciones

9. Implementa específicamente estas reglas:
   ```
   match /properties/{propertyId} {
     // Reglas para propiedades
     allow read: if 
       // Información básica visible para todos
       (resource.data.status == 'active' && resource.data.verified == true) ||
       // Información completa para usuarios autenticados
       (request.auth != null);
     
     // Solo brokers y admins pueden crear/editar
     allow create, update: if 
       request.auth != null && 
       (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'broker' || 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
     
     // Solo el broker propietario o admin puede eliminar
     allow delete: if 
       request.auth != null && 
       (resource.data.brokerRef == /databases/$(database)/documents/users/$(request.auth.uid) || 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
   }
   ```

## 5. REGLAS DE STORAGE

Crea reglas de seguridad para Firebase Storage que:

1. Permitan acceso público a imágenes de propiedades activas

2. Restrinjan la subida de imágenes a la carpeta 'properties/' solo a brokers y admins

3. Permitan a los usuarios subir imágenes a su propia carpeta de perfil

4. Restrinjan el acceso a documentos privados solo a brokers y admins

5. Otorguen acceso completo a administradores

## 6. CLOUD FUNCTIONS

### 6.1 Función para Importación desde buscabodegas.com
Crea una Cloud Function que:
1. Reciba datos de propiedades desde buscabodegas.com vía API
2. Mapee los campos de origen a la estructura de bodegas.pro
3. Guarde el ID original en customFields.bb_id
4. Actualice propiedades existentes o cree nuevas según corresponda
5. Registre la importación en la colección 'importLogs'

### 6.2 Función para Mapeo de Campos Personalizados
Crea una Cloud Function que:
1. Defina las relaciones entre campos de diferentes plataformas
2. Mapee automáticamente campos como:
   - bb_ref → propertyRef (buscabodegas.com)
   - sl_ref → propertyRef (solili.mx)
   - Otros campos específicos de cada plataforma
3. Normalice valores como ubicaciones, tipos de propiedad, etc.

### 6.3 Función para Generación de Slug
Crea una Cloud Function que:
1. Se active al crear o actualizar una propiedad
2. Genere un slug único basado en el título y ubicación
3. Verifique que no existan duplicados
4. Actualice el campo 'slug' de la propiedad

### 6.4 Función para Control de Acceso
Crea una Cloud Function que:
1. Verifique los permisos de usuario al acceder a datos sensibles
2. Oculte campos como 'ownerInfo' para usuarios no autorizados
3. Oculte la ubicación exacta para visitantes no registrados
4. Reemplace la información de contacto del broker con info@bodegas.pro para visitantes
5. Registre intentos de acceso no autorizados

### 6.5 Función para Verificación de Teléfono
Crea una Cloud Function que:
1. Gestione el proceso de verificación de teléfono vía SMS
2. Valide el código ingresado por el usuario
3. Actualice el estado de verificación en el perfil del usuario
4. Otorgue acceso a funcionalidades adicionales tras verificación exitosa
5. Limite el número de intentos de verificación

## 7. ÍNDICES Y CONSULTAS OPTIMIZADAS

Define índices compuestos para:
1. Búsqueda de propiedades por ubicación y rango de precios
2. Búsqueda de propiedades por tamaño y características
3. Filtrado de propiedades por broker y estado
4. Ordenamiento de propiedades por fecha de publicación y relevancia

## 8. CONFIGURACIÓN DE FIREBASE EMULATORS

Configura emuladores locales para:
1. Firestore
2. Authentication
3. Storage
4. Functions
5. Hosting

## 9. INTEGRACIÓN CON NEXT.JS

Proporciona código para:
1. Inicialización de Firebase en Next.js
2. Hooks personalizados para autenticación, incluyendo verificación por SMS
3. Componente para verificación de teléfono con reCAPTCHA
4. Hooks para consultas a Firestore
5. Componentes para subida de archivos a Storage
6. Integración con Server-Side Rendering
7. Componente para mostrar ubicación aproximada a visitantes y exacta a usuarios registrados

## 10. MIGRACIÓN Y RESPALDO

Configura:
1. Estrategia de respaldo diario de Firestore
2. Plan de migración desde otras plataformas
3. Exportación e importación de datos
4. Verificación de integridad de datos

Proporciona el código completo, las reglas de seguridad y las instrucciones de implementación para cada sección.
"
```

## Instrucciones para Usar el Prompt

1. Abre Visual Studio Code y asegúrate de tener Gemini CLI instalado y configurado.

2. Crea un nuevo archivo para almacenar la configuración de Firebase:
   ```bash
   mkdir -p src/config
   touch src/config/firebase.ts
   ```

3. Copia el prompt completo y ejecútalo con Gemini CLI:
   ```bash
   gemini "el_prompt_completo" > firebase_config_completo.md
   ```

4. Revisa el resultado generado en `firebase_config_completo.md` y extrae las diferentes secciones para implementarlas en tu proyecto.

5. Para implementar secciones específicas, puedes usar prompts más enfocados:

   - Para la estructura de datos:
     ```bash
     gemini "Extrae del documento la estructura completa de Firestore para bodegas.pro y genera el código TypeScript para los modelos" > src/models/index.ts
     ```

   - Para las reglas de seguridad:
     ```bash
     gemini "Extrae del documento las reglas de seguridad de Firestore para bodegas.pro" > firestore.rules
     ```

   - Para la autenticación por SMS:
     ```bash
     gemini "Extrae del documento la configuración e implementación de autenticación por SMS para bodegas.pro y genera el código TypeScript completo" > src/services/phoneAuthService.ts
     ```

## Configuración de Autenticación por SMS

Para configurar la autenticación por SMS en Firebase:

1. **Habilitar el proveedor de teléfono en Firebase Console:**
   - Ve a Authentication > Sign-in method
   - Habilita "Phone" como método de inicio de sesión
   - Configura reCAPTCHA para verificación

2. **Implementar el componente de verificación:**
   ```typescript
   // src/components/auth/PhoneVerification.tsx
   import { useState } from 'react';
   import { RecaptchaVerifier, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
   import { auth, db } from '@/config/firebase';
   import { doc, updateDoc } from 'firebase/firestore';

   export const PhoneVerification = ({ userId, onSuccess }) => {
     const [phoneNumber, setPhoneNumber] = useState('');
     const [verificationId, setVerificationId] = useState('');
     const [verificationCode, setVerificationCode] = useState('');
     const [step, setStep] = useState('phone'); // 'phone' or 'code'
     const [error, setError] = useState('');
     
     // Inicializar reCAPTCHA
     const setupRecaptcha = () => {
       window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
         'size': 'normal',
         'callback': () => {
           // reCAPTCHA resuelto
         }
       });
     };
     
     // Enviar código de verificación
     const sendVerificationCode = async () => {
       try {
         setupRecaptcha();
         const phoneProvider = new PhoneAuthProvider(auth);
         const verificationId = await phoneProvider.verifyPhoneNumber(
           phoneNumber, 
           window.recaptchaVerifier
         );
         setVerificationId(verificationId);
         setStep('code');
       } catch (error) {
         setError(`Error al enviar código: ${error.message}`);
       }
     };
     
     // Verificar código
     const verifyCode = async () => {
       try {
         const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
         await signInWithCredential(auth, credential);
         
         // Actualizar perfil de usuario
         await updateDoc(doc(db, 'users', userId), {
           phoneNumber,
           phoneVerified: true
         });
         
         onSuccess();
       } catch (error) {
         setError(`Error al verificar código: ${error.message}`);
       }
     };
     
     return (
       <div className="phone-verification">
         {step === 'phone' ? (
           <>
             <h3>Verificación de teléfono</h3>
             <p>Ingresa tu número de teléfono para recibir un código de verificación por SMS.</p>
             <input 
               type="tel" 
               value={phoneNumber} 
               onChange={(e) => setPhoneNumber(e.target.value)}
               placeholder="+52 1 55 1234 5678"
             />
             <div id="recaptcha-container"></div>
             <button onClick={sendVerificationCode}>Enviar código</button>
           </>
         ) : (
           <>
             <h3>Ingresa el código de verificación</h3>
             <p>Hemos enviado un código por SMS a {phoneNumber}</p>
             <input 
               type="text" 
               value={verificationCode} 
               onChange={(e) => setVerificationCode(e.target.value)}
               placeholder="123456"
             />
             <button onClick={verifyCode}>Verificar</button>
           </>
         )}
         {error && <p className="error">{error}</p>}
       </div>
     );
   };
   ```

## Mapeo de Campos para Importación

El siguiente mapeo muestra la relación entre los campos de buscabodegas.com y bodegas.pro:

| Campo en buscabodegas.com | Campo en bodegas.pro | Notas |
|---------------------------|----------------------|-------|
| id | customFields.bb_id | ID original en buscabodegas.com |
| reference | customFields.bb_ref | Referencia original |
| title | title | - |
| description | description | - |
| location.address | location.address | Solo visible para usuarios registrados |
| location.city | location.city | - |
| location.state | location.state | - |
| location.coordinates | location.coordinates | Solo visible para usuarios registrados |
| area | specs.totalAreaM2 | - |
| height | specs.clearHeightM | - |
| docks | specs.loadingDocks | - |
| price | price.amount | - |
| currency | price.currency | - |
| period | price.period | - |
| images | media.images | Convertir formato |
| owner_info | ownerInfo | Campo restringido |
| status | status | Mapear valores |

## Campos Visibles Solo para Roles Específicos

Los siguientes campos tienen restricciones de visibilidad:

1. **Solo para usuarios registrados (clientes, brokers, admins):**
   - location.address (dirección exacta)
   - location.coordinates (coordenadas exactas)
   - contactInfo.private (información de contacto del broker)

2. **Solo para brokers y admins:**
   - ownerInfo (información del propietario)
   - brokerNotes (en consultas)
   - contactInfo.private.brokerPhone (teléfono directo del broker)

3. **Solo para admins:**
   - customFields (campos de importación)
   - importSource (detalles de origen)
   - analytics (datos analíticos detallados)
   - verificationStatus (estado de verificación de brokers)

## Notas Importantes

1. Los visitantes no registrados solo pueden ver información básica de las propiedades, ubicación aproximada (ciudad y zona) y el contacto general (info@bodegas.pro).

2. La autenticación por SMS es obligatoria para brokers y clientes que deseen acceder a información detallada de las propiedades.

3. El campo `ownerInfo` contiene información del propietario o responsable de la bodega y debe ser visible solo para brokers autorizados y administradores.

4. Los campos personalizados en `customFields` permiten mantener la compatibilidad con diferentes plataformas y facilitar la importación/exportación de datos.

5. Las relaciones entre campos de diferentes orígenes se manejan mediante el mapeo en las funciones de importación.

6. Implementa validación de datos tanto en el cliente como en las Cloud Functions para garantizar la integridad de los datos.
