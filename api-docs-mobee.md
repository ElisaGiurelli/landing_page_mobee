# MOBEE API Documentation v1.0

## 🌐 Base Configuration

### Base URL
```
Development: http://localhost:4000/api/v1
Production: https://api.mobee.com/v1
```

### Headers
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

### Response Format
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  metadata?: {
    page?: number;
    total?: number;
  };
}
```

## 🔐 Authentication

### POST /auth/login
```json
// Request
{
  "email": "mario@example.com",
  "password": "SecurePass123!"
}

// Response
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_abc123",
      "email": "mario@example.com",
      "role": "EMPLOYEE",
      "firstName": "Mario",
      "lastName": "Rossi"
    },
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 86400
  }
}
```

## 📊 Assessment Endpoints (US1-US3)

### POST /assessments/cv-upload
**US1**: Upload CV con parsing automatico

```typescript
// Request: multipart/form-data
file: File (PDF/DOCX, max 5MB)

// Response
{
  "success": true,
  "data": {
    "parsedData": {
      "personalInfo": {
        "name": "Marco Rossi",
        "email": "marco.rossi@email.com",
        "phone": "+39 123 456 7890"
      },
      "skills": ["React", "TypeScript", "Node.js"],
      "experience": [{
        "title": "Frontend Developer",
        "company": "Tech Corp",
        "duration": "2021-2023"
      }]
    },
    "assessmentId": "asmt_xyz789"
  }
}
```

### POST /assessments/{assessmentId}/skills
**US2**: Autovalutazione competenze

```json
// Request
{
  "skillRatings": [
    {
      "skillId": "skl_react",
      "selfRating": 4,
      "yearsExperience": 3
    },
    {
      "skillId": "skl_typescript", 
      "selfRating": 3,
      "yearsExperience": 2
    }
  ]
}

// Response
{
  "success": true,
  "data": {
    "savedCount": 2,
    "skillGaps": [
      {
        "skillId": "skl_react",
        "required": 5,
        "current": 4,
        "gapPercentage": 20
      }
    ]
  }
}
```

### POST /assessments/{assessmentId}/soft-skills
**US3**: Test soft skills

```json
// Request
{
  "responses": [
    {
      "questionId": "q1",
      "answer": "B",
      "timeSpent": 45
    }
  ]
}

// Response
{
  "success": true,
  "data": {
    "score": 75,
    "comparisonWithSelfAssessment": {
      "delta": 15,
      "alert": false
    }
  }
}
```

## 💭 Engagement Endpoints (US4)

### GET /engagement/current
Ottieni form del mese corrente

```json
{
  "success": true,
  "data": {
    "month": "2024-01",
    "questions": [
      {
        "id": "wellbeing",
        "text": "Come ti senti questa settimana?",
        "type": "rating",
        "scale": 5
      }
    ],
    "previousResponse": null
  }
}
```

### POST /engagement/submit
**US4**: Invia form mensile

```json
// Request
{
  "wellbeingScore": 4,
  "achievedGoals": ["Completato progetto X", "Certificazione Y"],
  "aspirations": ["Team Lead", "Esperto React"],
  "additionalComments": "Mi piacerebbe più formazione"
}

// Response  
{
  "success": true,
  "data": {
    "message": "Grazie per il feedback! Continua così 🚀",
    "overallScore": 78,
    "trend": "improving"
  }
}
```

## 📈 HR Analytics (US5-US7)

### GET /hr/dashboard
**US5**: Dashboard analytics

```json
{
  "success": true,
  "data": {
    "skillCoverage": {
      "overall": 72,
      "byCategory": {
        "frontend": 85,
        "backend": 65,
        "devops": 45
      }
    },
    "engagementMetrics": {
      "average": 75,
      "trend": "stable",
      "lowEngagementCount": 3
    },
    "alerts": [
      {
        "type": "SKILL_GAP",
        "severity": "HIGH",
        "message": "DevOps skill gap critico",
        "affectedEmployees": 3
      }
    ],
    "availableResources": 12
  }
}
```

### GET /hr/employees
**US6**: Planner dipendenti con filtri

```typescript
// Query params
?role=frontend
&skills=react,typescript
&engagement=high
&page=1
&limit=20
&sort=matchScore:desc

// Response
{
  "success": true,
  "data": [
    {
      "id": "usr_123",
      "firstName": "Marco",
      "lastName": "Rossi",
      "role": "Frontend Developer",
      "matchScore": 85,
      "engagementScore": 82,
      "skillGaps": ["DevOps", "Testing"],
      "badge": "green",
      "aspirations": ["Team Lead"]
    }
  ],
  "metadata": {
    "total": 45,
    "page": 1,
    "limit": 20
  }
}
```

### GET /hr/employees/{employeeId}
**US7**: Dettaglio dipendente

```json
{
  "success": true,
  "data": {
    "personalInfo": {
      "id": "usr_123",
      "firstName": "Marco",
      "lastName": "Rossi",
      "email": "marco.rossi@company.com",
      "role": "Frontend Developer",
      "department": "Engineering",
      "startDate": "2022-03-15"
    },
    "skills": {
      "technical": [
        {
          "name": "React",
          "selfRating": 4,
          "requiredLevel": 5,
          "gap": 20,
          "lastUsed": "2024-01"
        }
      ]
    },
    "engagement": {
      "current": 78,
      "history": [
        { "month": "2024-01", "score": 78 },
        { "month": "2023-12", "score": 75 }
      ]
    },
    "projects": [
      {
        "name": "E-commerce App",
        "role": "Lead Frontend",
        "duration": "6 mesi"
      }
    ],
    "suggestions": [
      {
        "type": "TRAINING",
        "title": "Corso DevOps Advanced",
        "priority": "HIGH"
      }
    ]
  }
}
```

## 🎯 Matching & Suggestions

### POST /matching/calculate
Calcola match score per progetto

```json
// Request
{
  "employeeId": "usr_123",
  "projectRequirements": {
    "skills": ["React", "Node.js", "PostgreSQL"],
    "minEngagement": 70,
    "availability": 100
  }
}

// Response
{
  "success": true,
  "data": {
    "matchScore": 82,
    "breakdown": {
      "skillMatch": 85,
      "engagementMatch": 78,
      "availabilityMatch": 100
    },
    "missingSkills": ["PostgreSQL"],
    "recommendation": "SUITABLE_WITH_TRAINING"
  }
}
```

## ⚠️ Error Codes

| Code | Description | HTTP Status |
|------|-------------|------------|
| AUTH_001 | Invalid credentials | 401 |
| AUTH_002 | Token expired | 401 |
| VAL_001 | Invalid input | 400 |
| VAL_002 | File too large | 413 |
| CV_001 | CV parsing failed | 422 |
| NOT_FOUND | Resource not found | 404 |

## 🧪 Validation Examples

```typescript
// Zod schemas
const skillRatingSchema = z.object({
  skillId: z.string(),
  selfRating: z.number().min(1).max(5),
  yearsExperience: z.number().min(0).max(50)
});

const engagementSchema = z.object({
  wellbeingScore: z.number().min(1).max(5),
  achievedGoals: z.array(z.string()).max(10),
  aspirations: z.array(z.string()).max(5)
});
```

## 📊 Rate Limiting

- Employee endpoints: 100 req/min
- HR endpoints: 200 req/min
- File upload: 10 req/min

Headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```