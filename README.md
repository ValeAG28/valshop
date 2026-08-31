# VAL Digital Services — valshop

Licencias premium, streaming e IA para profesionales exigentes. Entrega &lt; 5 min, garantía 100%, soporte &lt; 2h.

**Demo:** https://valshop.wasmer.app  
**Repo:** https://github.com/ValeAG28/valshop

## Stack
HTML5 semántico + Tailwind CDN + JS ES6 vanilla (sin framework) + Lucide Icons. Estética Dark Cyber SaaS (#050814, indigo #6366f1, cyan #06b6d4).

## Módulos
- **Catálogo** con filtros, sort, búsqueda debounce, quick-view modal
- **Carrito** slide-over con `localStorage`, cupones `VAL10`/`PROMO20`, totales por moneda (USD/EUR/ARS/MXN/COP)
- **Método de pago** selector (Transferencia, Mercado Pago, PayPal, Stripe) — checkout genera link WhatsApp con `ID #VAL-XXXXXX`, método y total
- **Soporte** (`#soporte`) con buscador FAQ, cards WhatsApp/Email/Horarios
- **Contacto** (`#contacto`) formulario validado → ticket `#SOP-XXXXXX` → WhatsApp

## Deploy en Wasmer Edge
```bash
# 1) Instalar CLI
curl https://get.wasmer.io -sSfL | sh && wasmer login
# 2) Deploy estático
wasmer deploy
# o local:
wasmer run . -- --port 8080
```
Config: `wasmer.toml` (`public="."`) + `app.yaml` (`ValeAG28/valshop`). Ver https://docs.wasmer.io

## Configuración
Editar `script.js:CONFIG`:
```js
whatsappPhone: '5491123456789' // tu número real con prefijo país
supportEmail: 'soporte@valdigital.com'
```

## Scripts
No build. Abrir `index.html` directo. Cupones de prueba: `VAL10` (10%), `PROMO20` (20%).

## Roadmap
- [ ] Conectar `/api/create-preference` Mercado Pago + webhook
- [ ] Stripe Elements + PayPal SDK
- [ ] Panel admin / DB pedidos
