---
trigger: always_on
---

0. PURPOSE (ABSOLUTE)

This file defines strict code-level laws to ensure:
	•	Consistent naming
	•	Small, readable functions
	•	Reusable and composable code
	•	Zero duplication
	•	Long-term maintainability

Any violation = incorrect code, regardless of functionality.

⸻

1. GENERAL CODE STYLE RULES
	1.	Code must be readable without comments
	2.	Prefer clarity over cleverness
	3.	Explicit code > implicit behavior
	4.	If logic feels hard to name, it is wrongly designed
	5.	If a file grows fast, it has too many responsibilities

⸻

2. FILE RULES
	1.	One responsibility per file
	2.	One primary export per file
	3.	Max file length: 300 lines
	4.	Files exceeding 300 lines MUST be split
	5.	File name must reflect intent, not implementation

File Naming
	•	kebab-case for folders
	•	camelCase.ts for utilities
	•	PascalCase.tsx for React components
	•	useSomething.ts for hooks

⸻

3. FUNCTION RULES (VERY STRICT)
	1.	Max 20 lines per function
	2.	Max 3 parameters
	3.	Function must do one thing only
	4.	No nested conditionals deeper than 2 levels
	5.	Prefer early returns
	6.	No boolean flags as parameters
	7.	No optional behavior inside a function

If function breaks rules → SPLIT IT

⸻

4. FUNCTION NAMING CONVENTIONS

Functions (verbs only)

calculateTotalAmount
validateUserInput
fetchUserProfile
mapOrderToViewModel

❌ Bad:

handleData
doStuff
process
func1


⸻

5. VARIABLE NAMING CONVENTIONS
	1.	Names must reveal intent
	2.	No abbreviations
	3.	No single-letter names (except loop indexes)

Boolean Variables

Must start with:
	•	is
	•	has
	•	should
	•	can

isUserLoggedIn
hasValidToken
shouldRetryRequest


⸻

6. CONSTANT NAMING
	•	UPPER_SNAKE_CASE only

MAX_RETRY_COUNT
DEFAULT_PAGE_SIZE
API_TIMEOUT_MS


⸻

7. CLASS NAMING
	1.	Classes must be nouns
	2.	No suffixes like Manager, Helper, Utils
	3.	Name must represent responsibility

User
OrderCalculator
PaymentValidator


⸻

8. INTERFACE & TYPE NAMING
	•	Interfaces → nouns
	•	No I prefix
	•	Suffix only when meaningful

UserRepository
AuthPort
PaymentResponse


⸻

9. REUSABILITY RULES (CRITICAL)
	1.	Duplicate logic is forbidden
	2.	If logic appears twice, extract it
	3.	Reusable logic must be:
	•	pure
	•	testable
	•	independent
	4.	UI reuse → components
	5.	Logic reuse → hooks / services / utils

⸻

10. CODE SPLITTING RULES

When to split code

Split when:
	•	Function > 20 lines
	•	Component > 200 lines
	•	File > 300 lines
	•	Logic has a different reason to change

How to split
	•	Extract functions by intent
	•	Extract hooks for logic
	•	Extract services for workflows
	•	Extract utilities for pure logic

⸻

11. COMPONENT SPLITTING RULES
	1.	Component must represent one UI concept
	2.	If component handles:
	•	state
	•	side effects
	•	rendering
→ split into container + presentational
	3.	JSX must stay shallow and readable
	4.	No complex logic inside JSX

⸻

12. HOOK DESIGN RULES
	1.	Hooks handle logic, not rendering
	2.	One concern per hook
	3.	Hooks must be composable
	4.	Hooks must not mutate external state
	5.	Hooks must return named values (no arrays unless order matters)

return {
  data,
  isLoading,
  error,
  onSubmit
}


⸻

13. UTILITY FUNCTION RULES
	1.	Must be pure functions
	2.	No side effects
	3.	No framework imports
	4.	No direct API or storage access
	5.	Must be reusable across features

⸻

14. CONDITIONAL & LOOP RULES
	1.	Avoid else when early return works
	2.	Avoid nested loops
	3.	Prefer array methods (map, filter, reduce)
	4.	Conditions must be readable in one line

❌ Bad:

if (a && b && c && d && e)

✅ Good:

const isValidRequest = checkRequestValidity(...)
if (!isValidRequest) return


⸻

15. COMMENT RULES
	1.	Comments explain WHY, not WHAT
	2.	No obvious comments
	3.	If code needs explanation → refactor it
	4.	TODO comments must include owner & reason

⸻

16. REFACTORING TRIGGERS (MANDATORY)

You MUST refactor if:
	•	You cannot name a function clearly
	•	You feel the need to add a comment
	•	A function grows beyond limits
	•	Logic is duplicated
	•	A test becomes hard to write

⸻

17. ANTI-PATTERNS (FORBIDDEN)

❌ Long functions
❌ God files
❌ Generic names
❌ Deep nesting
❌ Copy-paste logic
❌ Overloaded functions
❌ Utility dumping grounds

⸻

18. CODE REVIEW HARD FAIL CONDITIONS

Reject PR if:
	•	Naming is unclear
	•	Functions exceed limits
	•	Logic is duplicated
	•	Files exceed size limits
	•	Responsibilities are mixed
	•	Rules in this file are ignored

⸻

19. FINAL LAW (ABSOLUTE)

If code cannot be easily named, split, reused, and tested — it is WRONG.

