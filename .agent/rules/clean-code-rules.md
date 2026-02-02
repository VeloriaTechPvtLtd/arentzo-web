---
trigger: always_on
---

0. ABSOLUTE PURPOSE

This file defines non-negotiable engineering laws for a feature-based React + Vite project.

If any rule is violated, the code is considered incorrect, even if it works.

⸻

1. CORE IDEOLOGY
	1.	Features own everything they need
	2.	Business rules are protected from frameworks
	3.	UI is replaceable
	4.	Side effects are isolated
	5.	Readability is mandatory
	6.	Explicit structure beats flexibility
	7.	No hidden logic
	8.	Architecture must scale without refactor
	9.	Change must be localized
	10.	Features must not depend on other features

⸻

2. TECHNOLOGY BASELINE
	•	React
	•	Vite
	•	TypeScript (strict = true)
	•	No JavaScript files
	•	No any
	•	No implicit any
	•	No uncontrolled side effects

⸻

3. FEATURE-FIRST PROJECT STRUCTURE (MANDATORY)

src/
│
├── app/                          # App bootstrap (composition root)
│   ├── providers/
│   ├── router/
│   ├── config/
│   └── index.tsx
│
├── features/                     # ALL business features live here
│   ├── <feature-name>/
│   │   ├── domain/               # Business rules (pure)
│   │   │   ├── entities/
│   │   │   ├── valueObjects/
│   │   │   ├── services/
│   │   │   ├── errors/
│   │   │   └── useCases/
│   │   │
│   │   ├── application/          # Use-case orchestration
│   │   │   ├── ports/
│   │   │   ├── services/
│   │   │   ├── dto/
│   │   │   └── mappers/
│   │   │
│   │   ├── infrastructure/       # External implementations
│   │   │   ├── api/
│   │   │   ├── storage/
│   │   │   ├── analytics/
│   │   │   └── config/
│   │   │
│   │   ├── ui/                   # Feature UI
│   │   │   ├── pages/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── viewModels/
│   │   │   └── layouts/
│   │   │
│   │   ├── index.ts              # Feature public API
│   │   └── README.md             # Feature documentation
│   │
│   └── shared/                   # Shared across features (VERY LIMITED)
│
├── shared/                       # App-wide shared utilities
│   ├── utils/
│   ├── constants/
│   ├── types/
│   ├── guards/
│   └── helpers/
│
├── assets/
└── main.tsx


⸻

4. FEATURE ISOLATION RULES (CRITICAL)
	1.	A feature MUST NOT import another feature directly
	2.	Features communicate only through:
	•	application ports
	•	shared contracts
	3.	No cross-feature UI imports
	4.	No shared mutable state between features
	5.	Each feature must be independently removable

⸻

5. DEPENDENCY FLOW (STRICT)

Inside a feature:

ui → application → domain
infrastructure → application

Outside a feature:

app → features
features → shared

ABSOLUTELY FORBIDDEN
	•	domain importing:
	•	react
	•	browser APIs
	•	fetch / axios
	•	storage
	•	analytics
	•	ui importing:
	•	infrastructure
	•	application importing:
	•	ui
	•	circular dependencies (anywhere)

⸻

6. DOMAIN RULES (FEATURE CORE)
	1.	Pure TypeScript only
	2.	No side effects
	3.	No framework imports
	4.	Entities are immutable
	5.	Validation lives in value objects
	6.	Business rules only
	7.	Explicit domain errors
	8.	No logging
	9.	No formatting logic

⸻

7. APPLICATION RULES (FEATURE ORCHESTRATION)
	1.	Coordinates domain logic
	2.	Uses domain entities only
	3.	Depends on ports (interfaces)
	4.	No framework imports
	5.	No UI logic
	6.	Handles workflows
	7.	Maps domain errors
	8.	Stateless by default

⸻

8. INFRASTRUCTURE RULES (FEATURE EXTERNALS)
	1.	Implements application ports
	2.	Contains APIs, storage, analytics
	3.	Handles side effects
	4.	Replaceable without breaking logic
	5.	No business rules
	6.	No UI logic

⸻

9. UI RULES (FEATURE PRESENTATION)
	1.	Pure rendering only
	2.	No business rules
	3.	No API calls
	4.	No direct storage access
	5.	No analytics calls
	6.	Logic lives in hooks/viewModels
	7.	JSX is declarative only

⸻

10. VIEWMODEL RULES
	1.	Adapts application output to UI
	2.	No JSX
	3.	No side effects
	4.	Calls application services
	5.	Maps domain/application models to UI models

⸻

11. COMPONENT RULES
	1.	One component per file
	2.	One responsibility
	3.	Max 200 lines per file
	4.	Props must be typed
	5.	No inline functions in JSX
	6.	No business logic
	7.	Prefer composition over configuration

⸻

12. HOOK RULES
	1.	Must start with use
	2.	One concern per hook
	3.	No JSX inside hooks
	4.	Hooks may call application services
	5.	Hooks must be testable
	6.	No infrastructure access

⸻

13. FUNCTION RULES
	1.	Max 20 lines
	2.	Max 3 parameters
	3.	One responsibility
	4.	No deep nesting (>2)
	5.	Early returns mandatory
	6.	No boolean flags as params

⸻

14. NAMING RULES
	1.	Intent-revealing names only
	2.	No abbreviations
	3.	No single-letter names (except loops)
	4.	Booleans start with:
	•	is
	•	has
	•	should
	5.	Functions = verbs
	6.	Classes = nouns

⸻

15. STATE MANAGEMENT RULES
	•	Local UI state → useState
	•	Feature UI shared state → feature context
	•	Business state → application services
	•	No global mutable state
	•	No state in domain

⸻

16. ERROR HANDLING RULES
	1.	No swallowed errors
	2.	Domain throws domain errors
	3.	Application maps errors
	4.	UI displays user-safe messages
	5.	Errors must be typed
	6.	No silent failures

⸻

17. LOGGING RULES
	1.	No console.log
	2.	Centralized logger only
	3.	Domain never logs
	4.	No sensitive data
	5.	Structured logs only

⸻

18. ENVIRONMENT RULES (VITE)
	1.	Use import.meta.env only
	2.	No process.env
	3.	Env access only in config
	4.	No env usage in domain or ui

⸻

19. TESTING RULES

Coverage:
	•	Domain: 100%
	•	Application: ≥ 80%
	•	UI: Critical flows only

Testing types:
	•	Unit → domain
	•	Integration → application
	•	E2E → UI

Untested business logic is forbidden.

⸻

20. FEATURE DOCUMENTATION RULES

Each feature MUST have README.md containing:
	1.	Feature responsibility
	2.	Use cases
	3.	Data flow
	4.	Error cases
	5.	External dependencies

⸻

21. CODE REVIEW REJECTION RULES

Reject PR if:
	•	Feature boundaries are violated
	•	UI contains business logic
	•	Architecture flow is broken
	•	Naming is unclear
	•	Rules are ignored
	•	Side effects are uncontrolled

⸻

22. FORBIDDEN PRACTICES

❌ Cross-feature imports
❌ God components
❌ Fat hooks
❌ Magic numbers
❌ Copy-paste logic
❌ Shared mutable state
❌ Framework leakage into domain

⸻

23. FINAL LAW (ABSOLUTE)

If a feature cannot be understood, tested, or removed independently — the architecture is WRONG.