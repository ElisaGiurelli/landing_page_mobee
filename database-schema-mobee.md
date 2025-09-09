# MOBEE Database Schema Documentation

## 🏗️ PostgreSQL + Prisma Setup

### Quick Start
```bash
# Init Prisma
npx prisma init

# Create migration
npx prisma migrate dev --name init

# Generate client
npx prisma generate

# Seed data
npx prisma db seed
```

### Prisma Configuration
```prisma
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["fullTextSearch"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## 📊 Core Tables (with camelCase mapping)

### users
```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String    @map("password_hash")
  role          UserRole  @default(EMPLOYEE)
  isActive      Boolean   @default(true) @map("is_active")
  
  // Relations
  profile       Profile?
  assessments   Assessment[]
  skills        UserSkill[]
  engagements   Engagement[]
  
  // Timestamps
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")
  
  @@index([email, isActive])
  @@map("users")
}

enum UserRole {
  EMPLOYEE
  HR_MANAGER
  ADMIN
}
```

### profiles
```prisma
model Profile {
  id            String    @id @default(cuid())
  userId        String    @unique @map("user_id")
  firstName     String    @map("first_name")
  lastName      String    @map("last_name")
  jobTitle      String?   @map("job_title")
  department    String?
  seniority     Seniority @default(JUNIOR)
  
  // Relations
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([department])
  @@map("profiles")
}

enum Seniority {
  JUNIOR
  MID
  SENIOR
  LEAD
}
```

### skills
```prisma
model Skill {
  id            String     @id @default(cuid())
  name          String     @unique
  category      SkillCategory
  description   String?
  isActive      Boolean    @default(true) @map("is_active")
  
  // Relations
  userSkills    UserSkill[]
  requiredForRoles RoleSkill[]
  
  @@index([category, isActive])
  @@map("skills")
}

enum SkillCategory {
  TECHNICAL
  SOFT
  DOMAIN
  TOOL
}
```

### user_skills (US2 - Autovalutazione)
```prisma
model UserSkill {
  id              String    @id @default(cuid())
  userId          String    @map("user_id")
  skillId         String    @map("skill_id")
  selfRating      Int       @map("self_rating") // 1-5
  verifiedRating  Int?      @map("verified_rating")
  yearsExperience Float?    @map("years_experience")
  
  // Relations
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  skill           Skill     @relation(fields: [skillId], references: [id])
  
  // Timestamps
  createdAt       DateTime  @default(now()) @map("created_at")
  updatedAt       DateTime  @updatedAt @map("updated_at")
  
  @@unique([userId, skillId])
  @@map("user_skills")
}
```

### assessments (US1, US3)
```prisma
model Assessment {
  id              String    @id @default(cuid())
  userId          String    @map("user_id")
  type            AssessmentType
  status          AssessmentStatus @default(PENDING)
  
  // CV Data (US1)
  cvFileName      String?   @map("cv_file_name")
  parsedCvData    Json?     @map("parsed_cv_data")
  
  // Soft Skills (US3)
  softSkillsScore Int?      @map("soft_skills_score")
  responses       Json?     // Array of question responses
  
  // Relations
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Timestamps
  startedAt       DateTime? @map("started_at")
  completedAt     DateTime? @map("completed_at")
  createdAt       DateTime  @default(now()) @map("created_at")
  
  @@index([userId, type, status])
  @@map("assessments")
}

enum AssessmentType {
  INITIAL
  QUARTERLY
  ANNUAL
}

enum AssessmentStatus {
  PENDING
  IN_PROGRESS
  COMPLETED
}
```

### engagements (US4)
```prisma
model Engagement {
  id               String    @id @default(cuid())
  userId           String    @map("user_id")
  month            DateTime  @db.Date
  
  // Scores (1-5)
  wellbeingScore   Int       @map("wellbeing_score")
  achievedGoals    String[]  @map("achieved_goals")
  aspirations      String[]
  comments         String?
  
  // Calculated
  overallScore     Float?    @map("overall_score")
  
  // Relations
  user             User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Timestamps
  createdAt        DateTime  @default(now()) @map("created_at")
  
  @@unique([userId, month])
  @@index([month, overallScore])
  @@map("engagements")
}
```

### skill_gaps (for HR views)
```prisma
model SkillGap {
  id              String    @id @default(cuid())
  userId          String    @map("user_id")
  skillId         String    @map("skill_id")
  currentLevel    Int       @map("current_level")
  requiredLevel   Int       @map("required_level")
  gapPercentage   Float     @map("gap_percentage")
  priority        GapPriority
  
  // Relations (read-only, calculated)
  user            User      @relation(fields: [userId], references: [id])
  skill           Skill     @relation(fields: [skillId], references: [id])
  
  // Timestamps
  calculatedAt    DateTime  @default(now()) @map("calculated_at")
  
  @@index([userId, priority])
  @@map("skill_gaps")
}

enum GapPriority {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}
```

## 🔧 Repository Pattern Examples

### Base Repository
```typescript
// repositories/base.repository.ts
export abstract class BaseRepository<T> {
  constructor(protected prisma: PrismaClient) {}
  
  protected handleError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('Duplicate entry');
      }
      if (error.code === 'P2025') {
        throw new Error('Record not found');
      }
    }
    throw error;
  }
}
```

### User Repository
```typescript
// repositories/user.repository.ts
export class UserRepository extends BaseRepository<User> {
  async createWithProfile(data: CreateUserDto) {
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: data.email,
          passwordHash: await hash(data.password),
          profile: {
            create: {
              firstName: data.firstName,
              lastName: data.lastName,
              jobTitle: data.jobTitle,
              department: data.department
            }
          }
        },
        include: {
          profile: true
        }
      });
      return user;
    });
  }
  
  async findForPlanner(filters: PlannerFilters) {
    return this.prisma.user.findMany({
      where: {
        role: 'EMPLOYEE',
        isActive: true,
        ...(filters.department && {
          profile: { department: filters.department }
        }),
        ...(filters.skillIds && {
          skills: {
            some: {
              skillId: { in: filters.skillIds }
            }
          }
        })
      },
      include: {
        profile: true,
        skills: {
          include: { skill: true }
        },
        engagements: {
          orderBy: { month: 'desc' },
          take: 1
        }
      }
    });
  }
}
```

## 📊 Views & Calculated Fields

### Employee Dashboard View
```sql
CREATE VIEW employee_dashboard AS
SELECT 
  u.id,
  p.first_name || ' ' || p.last_name as full_name,
  COUNT(DISTINCT us.skill_id) as skill_count,
  AVG(us.self_rating) as avg_skill_rating,
  e.overall_score as latest_engagement,
  COUNT(CASE WHEN sg.priority IN ('HIGH', 'CRITICAL') THEN 1 END) as critical_gaps
FROM users u
LEFT JOIN profiles p ON u.id = p.user_id
LEFT JOIN user_skills us ON u.id = us.user_id
LEFT JOIN engagements e ON u.id = e.user_id 
  AND e.month = DATE_TRUNC('month', CURRENT_DATE)
LEFT JOIN skill_gaps sg ON u.id = sg.user_id
WHERE u.role = 'EMPLOYEE'
GROUP BY u.id, p.first_name, p.last_name, e.overall_score;
```

### HR Analytics View
```sql
CREATE VIEW hr_analytics AS
SELECT 
  p.department,
  COUNT(DISTINCT u.id) as employee_count,
  AVG(e.overall_score) as avg_engagement,
  COUNT(DISTINCT CASE WHEN sg.priority = 'CRITICAL' THEN u.id END) as critical_skill_gaps,
  ARRAY_AGG(DISTINCT s.name) FILTER (WHERE sg.priority = 'CRITICAL') as critical_skills
FROM profiles p
JOIN users u ON p.user_id = u.id
LEFT JOIN engagements e ON u.id = e.user_id 
  AND e.month = DATE_TRUNC('month', CURRENT_DATE)
LEFT JOIN skill_gaps sg ON u.id = sg.user_id
LEFT JOIN skills s ON sg.skill_id = s.id
GROUP BY p.department;
```

## 🚀 Migrations & Seed Data

### Initial Migration
```bash
npx prisma migrate dev --name init
```

### Seed Script
```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create skills
  const skills = await Promise.all([
    prisma.skill.create({
      data: { name: 'React', category: 'TECHNICAL' }
    }),
    prisma.skill.create({
      data: { name: 'Node.js', category: 'TECHNICAL' }
    }),
    prisma.skill.create({
      data: { name: 'Leadership', category: 'SOFT' }
    })
  ]);
  
  // Create test users
  const testEmployee = await prisma.user.create({
    data: {
      email: 'test.employee@mobee.com',
      passwordHash: await hash('TestPass123!'),
      role: 'EMPLOYEE',
      profile: {
        create: {
          firstName: 'Test',
          lastName: 'Employee',
          jobTitle: 'Frontend Developer',
          department: 'Engineering'
        }
      }
    }
  });
  
  console.log('Seed completed!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

## 🔍 Indexes & Performance

### Critical Indexes
```sql
-- User lookup
CREATE INDEX idx_users_email_active ON users(email) WHERE is_active = true;

-- Skill search
CREATE INDEX idx_skills_name_trgm ON skills USING gin(name gin_trgm_ops);

-- Engagement trends
CREATE INDEX idx_engagements_user_month ON engagements(user_id, month DESC);

-- Gap analysis
CREATE INDEX idx_skill_gaps_priority ON skill_gaps(priority) 
  WHERE priority IN ('HIGH', 'CRITICAL');
```

### Query Optimization Tips
- Use `include` wisely (not nested too deep)
- Prefer `select` for specific fields
- Use `findFirst` instead of `findMany` + `[0]`
- Batch operations with `createMany`
- Use raw SQL for complex analyticsmonth ON engagement_surveys(survey_month);
CREATE INDEX idx_engagement_overall ON engagement_surveys(overall_score);
```

### career_aspirations
Track employee career goals
```sql
CREATE TABLE career_aspirations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    aspiration_type aspiration_type NOT NULL,
    target_role VARCHAR(200),
    target_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE aspiration_type AS ENUM ('TECHNICAL_EXPERT', 'TEAM_LEAD', 'PROJECT_MANAGER', 'ARCHITECT', 'OTHER');
CREATE INDEX idx_aspirations_user ON career_aspirations(user_id);
```

## 📈 Analytics Tables

### skill_gaps
Calculated skill gaps per user
```sql
CREATE TABLE skill_gaps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES skills(id),
    current_level INTEGER,
    required_level INTEGER,
    gap_size INTEGER GENERATED ALWAYS AS (required_level - current_level) STORED,
    priority gap_priority DEFAULT 'MEDIUM',
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE gap_priority AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');
CREATE INDEX idx_gaps_user ON skill_gaps(user_id);
CREATE INDEX idx_gaps_priority ON skill_gaps(priority);
```

### team_metrics
Aggregated team/department metrics
```sql
CREATE TABLE team_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    department VARCHAR(100) NOT NULL,
    metric_date DATE NOT NULL,
    total_employees INTEGER,
    avg_engagement_score DECIMAL(3,1),
    skill_coverage_percent DECIMAL(5,2),
    critical_gaps INTEGER,
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(department, metric_date)
);

CREATE INDEX idx_team_metrics_dept ON team_metrics(department);
CREATE INDEX idx_team_metrics_date ON team_metrics(metric_date);
```

## 🔄 Activity & Audit Tables

### activity_logs
Track all user actions
```sql
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id UUID,
    metadata JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_activity_user ON activity_logs(user_id);
CREATE INDEX idx_activity_action ON activity_logs(action);
CREATE INDEX idx_activity_created ON activity_logs(created_at);
```

### notifications
System notifications
```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT,
    action_url VARCHAR(500),
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE notification_type AS ENUM ('ASSESSMENT_DUE', 'ENGAGEMENT_REMINDER', 'SKILL_UPDATE', 'SYSTEM');
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
```

## 🔧 Database Maintenance

### Indexes for Performance
```sql
-- Composite indexes for common queries
CREATE INDEX idx_user_skills_composite ON user_skills(user_id, skill_id, self_rating);
CREATE INDEX idx_engagement_composite ON engagement_surveys(user_id, survey_month, overall_score);

-- Partial indexes for active records
CREATE INDEX idx_users_active ON users(email) WHERE is_active = true;
CREATE INDEX idx_skills_active ON skills(name) WHERE is_active = true;
```

### Triggers
```sql
-- Auto-update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Views for Reporting
```sql
-- Employee overview
CREATE VIEW employee_overview AS
SELECT 
    u.id,
    u.email,
    p.first_name,
    p.last_name,
    p.department,
    COUNT(DISTINCT us.skill_id) as skill_count,
    AVG(es.overall_score) as avg_engagement,
    MAX(es.survey_month) as last_engagement
FROM users u
LEFT JOIN profiles p ON u.id = p.user_id
LEFT JOIN user_skills us ON u.id = us.user_id
LEFT JOIN engagement_surveys es ON u.id = es.user_id
WHERE u.role = 'EMPLOYEE'
GROUP BY u.id, u.email, p.first_name, p.last_name, p.department;

-- Skill coverage by department
CREATE VIEW department_skill_coverage AS
SELECT 
    p.department,
    s.category,
    COUNT(DISTINCT us.user_id) as users_with_skill,
    AVG(us.self_rating) as avg_rating
FROM profiles p
JOIN user_skills us ON p.user_id = us.user_id
JOIN skills s ON us.skill_id = s.id
GROUP BY p.department, s.category;
```

## 🚀 Migration Strategy

### Initial Setup
```bash
# Generate migration
npx prisma migrate dev --name init

# Apply to production
npx prisma migrate deploy

# Seed initial data
npx prisma db seed
```

### Backup Strategy
```sql
-- Daily backups
pg_dump -h localhost -U postgres -d mobee_production > backup_$(date +%Y%m%d).sql

-- Point-in-time recovery enabled
-- WAL archiving configured
```