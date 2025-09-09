# MOBEE MVP - HR Skills & Engagement Platform

## 🎯 Purpose
Web app per gestione HR: assessment dipendenti, tracking engagement, analisi skill gap

## 🛠 Tech Stack
- Next.js 14 + React 18 + TypeScript 5.3
- Tailwind CSS + Shadcn/ui 
- PostgreSQL 16 + Prisma ORM 5.x
- Node.js 20 + Express 4.18
- Testing: Jest + Qodo + SonarLint

## 📁 Project Structure
```
/src
  /app          # Next.js pages (max 200 lines)
  /components   # React components (max 150 lines)  
  /hooks        # Custom hooks
  /services     # API calls & business logic
  /lib          # Utils & configs
/prisma         # Database schema
/tests          # Test files
```

## 🚀 Commands
```bash
# Essential Claude Code commands
/clear          # SEMPRE quando inizi nuovo task
/compact        # Comprimi conversazioni lunghe

# Development
npm run dev     # Start all
npm run test    # Run tests
npm run db:push # Sync Prisma schema
```

## ✅ Code Style (FONDAMENTALE)
- ✅ camelCase per TUTTO tranne database
- ✅ File MAX 500 righe (decomposizione aggressiva)
- ✅ Arrow functions per React components
- ✅ Async/await invece di .then()
- ✅ Explicit types sempre (no any)
- ❌ NO console.log in produzione
- ❌ NO var, solo const/let

## 🎯 Naming Conventions
```typescript
// Variables & Functions: camelCase
const userName = "Mario";
const getUserById = () => {};

// React Components: PascalCase  
const UserProfile = () => {};

// Types/Interfaces: PascalCase
interface UserData {}

// Database: snake_case (con Prisma mapping)
firstName String @map("first_name")

// API: camelCase
{ "userId": "123", "firstName": "Mario" }
```

## 🏗 Key Patterns
```typescript
// Repository Pattern
class UserRepository extends BaseRepository<User> {
  async findWithPagination(params) {
    // Implementazione
  }
}

// Error Handling
try {
  // logic
} catch (error) {
  this.handleError(error);
}

// React Component Structure
export const Component: React.FC<Props> = () => {
  const { data, loading, error } = useCustomHook();
  
  if (loading) return <Skeleton />;
  if (error) return <ErrorBoundary />;
  
  return <View data={data} />;
};
```

## 📊 Feature Areas

### Employee (US1-US4)
- Assessment iniziale con CV parsing
- Autovalutazione skill (1-5 rating)
- Test soft skills (5 domande)
- Form engagement mensile

### HR (US5-US7)
- Dashboard analytics
- Planner dipendenti con filtri
- Scheda dettaglio dipendente
- Alert e suggerimenti

## 🧪 Testing Setup
```json
// .vscode/extensions.json
{
  "recommendations": [
    "qodo-ai.qodo",              // Test generation
    "sonarsource.sonarlint-vscode" // Code quality
  ]
}
```

Target Coverage:
- Services: 80%
- Components: 60%
- Overall: 65%

## ⚠️ Important Notes
- Parsing CV può fallire → mostra fallback manuale
- Skill gap = (Required - Current) in percentuale
- Engagement < 60% = Alert rosso
- Match algorithm: 40% skill + 20% engagement

## 🚫 Forbidden
- ❌ MAI modificare: node_modules/, .next/, dist/
- ❌ NO file > 500 righe
- ❌ NO modifiche dirette al DB, usa Prisma
- ❌ NO console.log (usa logger)

## 🔥 Quick Fixes
```bash
# Quando SonarLint trova problemi
"fix SonarLint security warnings in [file]"

# Per test mancanti
"generate comprehensive tests for [file] with Prisma mocks"

# Per refactoring
"reduce complexity of [function] to under 10"
```