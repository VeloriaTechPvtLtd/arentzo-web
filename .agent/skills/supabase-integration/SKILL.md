---
name: Supabase Integration
description: Standardized guide for connecting React UI to Supabase backend while strictly enforcing Clean Architecture and separation of concerns.
---

# Supabase Integration Skill

This skill defines the **mandatory** workflow for integrating Supabase. It strictly forbids direct database access from the UI to ensure long-term maintainability and adherence to Clean Architecture.

## 🚨 CRITICAL: Hard Fail Conditions
**Reject** immediately if:
1.  `import { supabase } ...` appears in any file inside `ui/` or `domain/`.
2.  UI components call `supabase.from(...)` directly.
3.  Database types (DTOs) are leaked into the UI (must use Domain Entities).
4.  Infrastructure logic appears in the Application layer.

---

## 1. Architecture Layers & Responsibilities

### ❌ Forbidden
*   **UI Layer**: NEVER imports `@supabase/supabase-js`.
*   **Domain Layer**: NEVER imports `@supabase/supabase-js`.

### ✅ Required Flow
1.  **UI Component**: Calls a Custom Hook (e.g., `useProducts`).
2.  **Custom Hook**: Calls an Application Service (e.g., `productService.getAll()`).
3.  **Application Service**: Calls a Port/Repository Interface (e.g., `productRepository.fetchProducts()`).
4.  **Infrastructure Repository**: Imports `supabaseClient`, executes query, **maps** DTO to Domain Entity, and returns it.

## 2. Implementation Workflow (Step-by-Step)

### Step 1: Domain Layer (The Contract)
Define the pure business entity and the interface (Port) for data fetching.
```typescript
// features/products/domain/entities/Product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
}

// features/products/application/ports/ProductRepository.ts
export interface ProductRepository {
  getProducts(): Promise<Product[]>;
}
```

### Step 2: Infrastructure Layer (The Implementation)
Implement the repository using Supabase. **This is the ONLY place Supabase is imported.**
```typescript
// features/products/infrastructure/repositories/SupabaseProductRepository.ts
import { supabase } from '@/shared/infrastructure/supabase/client';
import { ProductRepository } from '../../application/ports/ProductRepository';
import { Product } from '../../domain/entities/Product';

export class SupabaseProductRepository implements ProductRepository {
  async getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, price_cents'); // explicit selection

    if (error) throw new Error(error.message);

    // MAPPING: Database DTO -> Domain Entity
    return data.map(dto => ({
      id: dto.id,
      name: dto.name,
      price: dto.price_cents / 100, // Business logic handling
    }));
  }
}
```

### Step 3: Application Service (The Orchestrator)
```typescript
// features/products/application/services/ProductService.ts
export const productService = {
  getProducts: async () => {
    return await productRepo.getProducts();
  }
};
```

### Step 4: UI Hook (The Consumer)
Use React Query or simple `useEffect` to consume the service.
```typescript
// features/products/ui/hooks/useProducts.ts
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getProducts()
  });
};
```

## 3. Data Handling Rules
1.  **Select Specific Fields**: Always use `.select('field1, field2')`. Never `select('*')` in production.
2.  **Mapping is Mandatory**: Database tables change. Domain entities shouldn't. Map them in the Repository.
3.  **Snake_case to camelCase**: Supabase uses `snake_case`. TypeScript uses `camelCase`. The conversion happens in the Repository.

## 4. Security & Auth
1.  **Row Level Security (RLS)**: Rely on RLS policies in Postgres. Do not filter sensitive data using `where()` clauses in the client as a security measure (it's easily bypassed).
2.  **Auth Context**: Access user session via `useAuth()` hook, which wraps the Supabase auth listener.

## 5. Performance
1.  **Pagination**: Ensure `page` and `limit` are passed to the Repository for lists.
2.  **Indexing**: If a query is slow, verify Supabase dashboard indices before optimizing JS code.

---
**Goal**: If we switch from Supabase to Firebase tomorrow, we should only need to rewrite the **Infrastructure** folder. The UI and Domain should remain untouched.
