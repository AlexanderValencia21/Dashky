"use client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { validateUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import clsx from "clsx";
export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: false,
    password: false,
    invalid: false,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setErrors({
        username: !username,
        password: !password,
        invalid: false,
      });
      if (!username || !password) {
        toast.error("Por favor completa ambos campos.");
        setLoading(false);
        return;
      }

      const user = validateUser(username, password);

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Sesión iniciada exitosamente 🚀");
        router.push("/dashboard");
      } else {
        setErrors({
          username: true,
          password: true,
          invalid: true,
        });
        toast.error("Credenciales inválidas, intenta nuevamente.");
      }

      setLoading(false);
    }, 1000);
  };

  const handleInputChange =
    (field: "username" | "password") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (field === "username") {
        setUsername(e.target.value);
      } else {
        setPassword(e.target.value);
      }

      // Limpiar error solo para el campo que está siendo editado
      setErrors((prev) => ({
        ...prev,
        [field]: false,
        invalid: false,
      }));
    };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="absolute inset-0 block md:hidden z-0 bg-[linear-gradient(to_bottom_right,var(--corporate-dark),var(--corporate-slate),var(--corporate-dark))]">
        <Image
          src="/images/espiral2.png"
          alt="Decoración móvil"
          layout="fill"
          objectFit="cover"
          className="opacity-100"
        />
      </div>
      <div className="absolute top-6 left-6 z-10 block md:hidden">
        <Image
          src="/images/logoLogin.png"
          alt="Logo móvil"
          width={32}
          height={32}
        />
      </div>
      <div className="relative hidden md:block bg-[linear-gradient(to_right,var(--corporate-ocean),var(--corporate-slate),var(--corporate-dark))]">
        <Image
          src="/images/espiral2.png"
          alt="Decoración"
          layout="fill"
          objectFit="cover"
          className="opacity-100"
        />
        <div className="absolute top-6 left-6">
          <Image
            src="/images/logoLogin.png"
            alt="Logo"
            width={32}
            height={32}
          />
        </div>
        <div className="absolute top-6 right-6 max-w-s text-right">
          <p className="font-raleway text-white text-2xl font-medium leading-snug">
            Dashky
          </p>
        </div>
        <div className="absolute bottom-8 left-8 text-white text-4xl">
          <p className="font-raleway">Si vas a confiar,</p>{" "}
          <p className="font-raleway">que sea en los datos</p>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center bg-transparent md:bg-corporate-white p-4 sm:p-6">
        <Card className="w-full max-w-md bg-white p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-corporate-slate">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-raleway font-semibold text-corporate-dark">
              Inicia Sesion
            </CardTitle>
            <p className="text-md font-raleway text-corporate-dark">
              Accede a tu cuenta
            </p>
          </CardHeader>
          <CardContent className="pt-2">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={handleInputChange("username")}
                className={clsx(
                  "font-raleway text-sm text-corporate-dark border-2",
                  errors.username || errors.invalid
                    ? "border-red-500 focus-visible:ring-red-500"
                    : "border-corporate-ocean focus-visible:ring-corporate-ocean"
                )}
              />
              <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={handleInputChange("password")}
                className={clsx(
                  "font-raleway text-sm text-corporate-dark border-2",
                  errors.password || errors.invalid
                    ? "border-red-500 focus-visible:ring-red-500"
                    : "border-corporate-ocean focus-visible:ring-corporate-ocean"
                )}
              />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm mt-2">
                <label className="font-raleway flex items-center gap-3 text-corporate-dark ">
                  <input
                    type="checkbox"
                    className="accent-teal-600  cursor-pointer"
                  />
                  Recuerdame
                </label>
                <Link
                  href="#"
                  className="font-raleway font-semibold text-center text-corporate-dark hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Button
                type="submit"
                className="font-raleway cursor-pointer w-full bg-corporate-slate text-white rounded-2xl hover:bg-corporate-dark"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                ) : null}
                {loading ? "Iniciando..." : "Iniciar Sesion"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
