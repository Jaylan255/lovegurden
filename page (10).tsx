@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 300 13% 98%;
    --foreground: 350 20% 15%;
    --card: 0 0% 100%;
    --card-foreground: 350 20% 15%;
    --popover: 0 0% 100%;
    --popover-foreground: 350 20% 15%;
    --primary: 350 89% 60%;
    --primary-foreground: 0 0% 100%;
    --secondary: 271 91% 96%;
    --secondary-foreground: 271 91% 40%;
    --muted: 271 20% 94%;
    --muted-foreground: 350 10% 45%;
    --accent: 271 91% 65%;
    --accent-foreground: 0 0% 100%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 350 20% 90%;
    --input: 350 20% 90%;
    --ring: 350 89% 60%;
    --radius: 1.5rem;
  }

  [data-theme='pink-blossom'] {
    --background: 330 100% 98%;
    --foreground: 330 40% 20%;
    --primary: 330 80% 60%;
    --accent: 330 100% 85%;
    --secondary: 330 100% 94%;
  }

  [data-theme='dark-love'] {
    --background: 350 20% 5%;
    --foreground: 350 10% 95%;
    --card: 350 20% 8%;
    --primary: 350 100% 50%;
    --accent: 0 100% 50%;
    --border: 350 20% 15%;
    --muted: 350 20% 12%;
    --muted-foreground: 350 10% 60%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground font-body transition-colors duration-300 overflow-x-hidden;
  }
}

.glass {
  @apply bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)];
}

.gradient-text {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient-flow;
}

.gradient-bg {
  background: radial-gradient(circle at 0% 0%, hsl(var(--primary) / 0.08) 0%, transparent 50%),
              radial-gradient(circle at 100% 100%, hsl(var(--accent) / 0.08) 0%, transparent 50%),
              hsl(var(--background));
  @apply min-h-screen;
}

@keyframes gradient-flow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient-flow {
  animation: gradient-flow 6s ease infinite;
}

@keyframes heart-float {
  0% { transform: translateY(110vh) scale(0.5) rotate(0deg); opacity: 0; }
  10% { opacity: 0.6; }
  90% { opacity: 0.6; }
  100% { transform: translateY(-20vh) scale(1.2) rotate(360deg); opacity: 0; }
}

.animate-heart-float {
  animation: heart-float linear infinite;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.click-heart {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  animation: popup-float 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes popup-float {
  0% { transform: translate(-50%, -50%) scale(0) rotate(-20deg); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translate(-50%, -200%) scale(1.5) rotate(20deg); opacity: 0; }
}

.active-spring:active {
  transform: scale(0.92);
  transition: transform 0.05s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
