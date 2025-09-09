# MOBEE MVP - Functional Specifications

## 🎯 Executive Summary
MOBEE automatizza assessment dipendenti e tracking engagement per HR. MVP focalizzato su: CV parsing, skill gap analysis, engagement monitoring, resource planning.

## 📋 User Stories Overview

### 👤 Dipendente (US1-US4)
- **US1**: Upload CV con parsing automatico → ALTA priorità
- **US2**: Autovalutazione skill (1-5) → ALTA priorità  
- **US3**: Test soft skills (5 domande) → MEDIA priorità
- **US4**: Form engagement mensile → ALTA priorità

### 🧑‍💼 HR (US5-US7)
- **US5**: Dashboard analytics → ALTA priorità
- **US6**: Planner dipendenti con filtri → ALTISSIMA priorità
- **US7**: Scheda dettaglio dipendente → ALTA priorità

## 🔄 User Flows Dettagliati

### US1: Compilare Assessment Iniziale
```
1. Dashboard → "Inizia Assessment"
2. Drag & drop CV (PDF/DOCX)
3. Sistema estrae: nome, email, skill, experience
4. Utente review dati → modifica se necessario
5. Salva bozza o prosegui
```
**Acceptance**: Parsing automatico, campi editabili, error handling

### US2: Autovalutazione Skill
```
1. Lista skill da CV + skill ruolo
2. Rating 1-5 per ogni skill
3. Sistema calcola gap: (Required - Current)
4. Alert visivi per gap > 30%
```
**Acceptance**: Rating modificabili, gap % visibile, alert colorati

### US3: Test Soft Skills
```
1. 5 domande scenario-based
2. Progress bar visibile
3. Una domanda per pagina
4. Score finale 0-100
5. Confronto con autovalutazione
```
**Acceptance**: Alert se delta > 20% vs autovalutazione

### US4: Form Engagement Mensile
```
1. 3 sezioni: Benessere, Obiettivi, Aspirazioni
2. Max 5 domande totali
3. Salvataggio bozza disponibile
4. Messaggio motivazionale finale
```
**Output**: `{ wellbeing: 1-5, goals: string[], aspirations: string[] }`

### US5: Dashboard HR
```
1. KPI cards: coverage %, engagement avg, alerts count
2. Grafici: skill heatmap, engagement trend
3. Alert critici in evidenza (rosso/giallo)
4. Link rapido a Planner
```
**Dati**: Aggregati mensili, soglie predefinite

### US6: Planner Dipendenti
```
1. Filtri: ruolo, skill, engagement, progetto
2. Tabella: nome, match %, engagement, gap, badge
3. Sorting multi-colonna
4. Click riga → dettaglio (US7)
```
**Badge colori**:
- Verde: match > 80%
- Giallo: 60-80%
- Rosso: < 60%

### US7: Scheda Dipendente
```
1. Info complete: anagrafica + storia
2. Grafici: skill radar, engagement line
3. Alert: low engagement, skill mismatch
4. Azioni suggerite applicabili
```
**CTA**: Formazione, Job rotation, Mentorship

## 📊 Business Rules

### Skill Gap Calculation
```typescript
skillGap = ((requiredLevel - currentLevel) / requiredLevel) * 100
// Gap > 30% = Alert
// Gap > 50% = Critical
```

### Match Score Algorithm
```typescript
matchScore = (
  skillMatch * 0.4 +      // 40% peso skill
  engagement * 0.2 +      // 20% engagement
  availability * 0.2 +    // 20% disponibilità
  aspirations * 0.1 +     // 10% fit aspirazioni
  experience * 0.1        // 10% esperienza
)
```

### Engagement Thresholds
- < 60%: Rosso (critico)
- 60-79%: Giallo (attenzione)
- ≥ 80%: Verde (ottimale)

## 🎨 UI/UX Specifications

### Design System (da Figma)
- Font: Inter
- Primary: #3B82F6
- Success: #10B981  
- Warning: #F59E0B
- Danger: #EF4444
- Spacing: 4px base unit

### Component Patterns
```typescript
// Card generico
<Card className="p-4 hover:shadow-lg transition-shadow">
  <CardHeader>
    <Badge status={status} />
  </CardHeader>
  <CardContent>...</CardContent>
</Card>

// Table row con badge
<TableRow onClick={handleClick} className="cursor-pointer hover:bg-gray-50">
  <TableCell>{name}</TableCell>
  <TableCell>
    <Badge variant={getVariant(matchScore)}>
      {matchScore}%
    </Badge>
  </TableCell>
</TableRow>
```

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640-1024px  
- Desktop: > 1024px

## 🔐 Data Model Essenziale

### User
- id, email, role (EMPLOYEE/HR)
- firstName, lastName (camelCase)
- createdAt, updatedAt

### Assessment
- userId, type, status
- cvData (JSON)
- skillRatings (JSON)
- softSkillsScore

### Engagement
- userId, month
- wellbeingScore (1-5)
- goals, aspirations
- overallScore (calc)

### SkillGap
- userId, skillId
- currentLevel, requiredLevel
- gapPercentage (calculated)
- priority (LOW/MEDIUM/HIGH/CRITICAL)

## 📈 Success Metrics MVP

### Technical
- Load time < 3s
- API response < 500ms  
- Zero critical bugs

### Business
- 80% dipendenti completa assessment
- 70% compila engagement mensile
- HR saves 4h/settimana

## 🚀 MVP Timeline

### Sprint 1 (Week 1-2)
- Setup progetto + DB schema
- US1: CV upload + parsing
- US2: Skill assessment

### Sprint 2 (Week 3-4)  
- US3: Soft skills test
- US4: Engagement form
- US5: Dashboard HR base

### Sprint 3 (Week 5-6)
- US6: Planner (priorità alta!)
- US7: Dettaglio dipendente
- Testing + bug fixing

## ⚠️ Vincoli e Assunzioni

### Vincoli Tecnici
- Max 5MB per CV upload
- Supporto solo PDF/DOCX
- No real-time updates (refresh manuale)

### Assunzioni
- Utenti già registrati (no auth in MVP)
- Skill list predefinita
- Un solo ruolo per dipendente