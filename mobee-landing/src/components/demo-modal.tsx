"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  Calendar,
  Loader2,
  Hexagon,
  Sparkles,
  User,
  Mail,
  Building,
  Phone,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  nome: string;
  cognome: string;
  email: string;
  azienda: string;
  ruolo: string;
  telefono: string;
  privacyAccepted: boolean;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    cognome: "",
    email: "",
    azienda: "",
    ruolo: "",
    telefono: "",
    privacyAccepted: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData((prev) => ({ ...prev, [name]: fieldValue }));

    // Clear error when user starts typing or changes checkbox
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = "Il nome è obbligatorio";
    }

    if (!formData.cognome.trim()) {
      newErrors.cognome = "Il cognome è obbligatorio";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email è obbligatoria";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Inserisci un'email valida";
    }

    if (!formData.azienda.trim()) {
      newErrors.azienda = "L'azienda è obbligatoria";
    }

    if (!formData.ruolo.trim()) {
      newErrors.ruolo = "Il ruolo è obbligatorio";
    }

    if (!formData.privacyAccepted) {
      newErrors.privacyAccepted = "È necessario accettare la Privacy Policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(
          "Richiesta inviata con successo! Ti contatteremo entro 24 ore.",
          {
            duration: 4000,
            position: "top-center",
          }
        );

        // Reset form
        setFormData({
          nome: "",
          cognome: "",
          email: "",
          azienda: "",
          ruolo: "",
          telefono: "",
          privacyAccepted: false,
        });

        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        toast.error(
          result.message ||
            "Errore nell'invio della richiesta. Riprova più tardi."
        );
      }
    } catch (error) {
      console.error("Error submitting demo request:", error);
      toast.error("Errore di connessione. Riprova più tardi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
      // Reset form when closing
      setFormData({
        nome: "",
        cognome: "",
        email: "",
        azienda: "",
        ruolo: "",
        telefono: "",
        privacyAccepted: false,
      });
      setErrors({});
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogOverlay className="bg-black/20 backdrop-blur-sm" />
      <DialogContent
        className="max-w-2xl mx-auto p-0 border-0 bg-transparent max-h-[95vh] sm:max-h-[90vh] w-[95vw] sm:w-auto overflow-y-auto sm:overflow-visible"
        showCloseButton={false}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative bg-white rounded-3xl shadow-2xl overflow-hidden max-h-full flex flex-col"
        >
          {/* Decorative Hexagons */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-6 -right-6 text-yellow-200/40"
            >
              <Hexagon className="w-24 h-24" />
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-8 -left-8 text-purple-200/30"
            >
              <Hexagon className="w-32 h-32" />
            </motion.div>
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-1/2 right-8 text-yellow-300/20"
            >
              <Hexagon className="w-16 h-16" />
            </motion.div>
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 shadow-sm"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>

          {/* Header */}
          <div className="relative bg-gradient-to-br from-gray-50 to-purple-50/30 px-4 sm:px-8 py-6 sm:py-10 border-b border-gray-100 shrink-0">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="bg-yellow-400 rounded-2xl p-3">
                  <Calendar className="w-8 h-8 text-purple-800" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1"
                >
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                </motion.div>
              </div>
              <div className="flex-1">
                <DialogTitle className="text-xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Prenota la tua Demo Personalizzata
                </DialogTitle>
                <DialogDescription className="text-gray-600 text-sm sm:text-lg">
                  Compila il form e ti contatteremo entro 24 ore per organizzare
                  una demo su misura per la tua azienda
                </DialogDescription>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="flex-1 overflow-y-auto">
            <form onSubmit={handleSubmit} className="relative z-10 p-4 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Nome */}
              <div className="space-y-2">
                <label
                  htmlFor="nome"
                  className="flex items-center gap-2 text-gray-700 font-medium"
                >
                  <User className="w-4 h-4 text-purple-600" />
                  Nome *
                </label>
                <Input
                  id="nome"
                  name="nome"
                  type="text"
                  value={formData.nome}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`${
                    errors.nome ? "border-red-500" : "border-gray-200"
                  } focus:border-purple-400 focus:ring-purple-200 rounded-xl h-12 transition-colors duration-300`}
                  placeholder="Il tuo nome"
                />
                {errors.nome && (
                  <p className="mt-1 text-sm text-red-500">{errors.nome}</p>
                )}
              </div>

              {/* Cognome */}
              <div className="space-y-2">
                <label htmlFor="cognome" className="text-gray-700 font-medium">
                  Cognome *
                </label>
                <Input
                  id="cognome"
                  name="cognome"
                  type="text"
                  value={formData.cognome}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`${
                    errors.cognome ? "border-red-500" : "border-gray-200"
                  } focus:border-purple-400 focus:ring-purple-200 rounded-xl h-12 transition-colors duration-300`}
                  placeholder="Il tuo cognome"
                />
                {errors.cognome && (
                  <p className="mt-1 text-sm text-red-500">{errors.cognome}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2 md:col-span-2">
                <label
                  htmlFor="email"
                  className="flex items-center gap-2 text-gray-700 font-medium"
                >
                  <Mail className="w-4 h-4 text-purple-600" />
                  Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`${
                    errors.email ? "border-red-500" : "border-gray-200"
                  } focus:border-purple-400 focus:ring-purple-200 rounded-xl h-12 transition-colors duration-300`}
                  placeholder="nome@azienda.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Azienda */}
              <div className="space-y-2">
                <label
                  htmlFor="azienda"
                  className="flex items-center gap-2 text-gray-700 font-medium"
                >
                  <Building className="w-4 h-4 text-purple-600" />
                  Azienda *
                </label>
                <Input
                  id="azienda"
                  name="azienda"
                  type="text"
                  value={formData.azienda}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`${
                    errors.azienda ? "border-red-500" : "border-gray-200"
                  } focus:border-purple-400 focus:ring-purple-200 rounded-xl h-12 transition-colors duration-300`}
                  placeholder="Nome dell'azienda"
                />
                {errors.azienda && (
                  <p className="mt-1 text-sm text-red-500">{errors.azienda}</p>
                )}
              </div>

              {/* Ruolo */}
              <div className="space-y-2">
                <label
                  htmlFor="ruolo"
                  className="flex items-center gap-2 text-gray-700 font-medium"
                >
                  <Briefcase className="w-4 h-4 text-purple-600" />
                  Ruolo *
                </label>
                <Input
                  id="ruolo"
                  name="ruolo"
                  type="text"
                  value={formData.ruolo}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`${
                    errors.ruolo ? "border-red-500" : "border-gray-200"
                  } focus:border-purple-400 focus:ring-purple-200 rounded-xl h-12 transition-colors duration-300`}
                  placeholder="Es. HR Manager, CEO, etc."
                />
                {errors.ruolo && (
                  <p className="mt-1 text-sm text-red-500">{errors.ruolo}</p>
                )}
              </div>

              {/* Telefono */}
              <div className="space-y-2 md:col-span-2">
                <label
                  htmlFor="telefono"
                  className="flex items-center gap-2 text-gray-700 font-medium"
                >
                  <Phone className="w-4 h-4 text-purple-600" />
                  Telefono
                </label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="border-gray-200 focus:border-purple-400 focus:ring-purple-200 rounded-xl h-12 transition-colors duration-300"
                  placeholder="+39 000 000 0000 (opzionale)"
                />
              </div>
            </div>

            {/* GDPR Checkbox */}
            <div className="mt-6 space-y-2">
              <div className="flex items-start gap-3">
                <input
                  id="privacyAccepted"
                  name="privacyAccepted"
                  type="checkbox"
                  checked={formData.privacyAccepted}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`mt-1 w-4 h-4 text-purple-600 border-2 rounded focus:ring-purple-500 focus:ring-2 ${
                    errors.privacyAccepted ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <label
                  htmlFor="privacyAccepted"
                  className="text-sm text-gray-700 leading-relaxed"
                >
                  Ho letto e accetto la{" "}
                  <a
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline font-medium"
                  >
                    Privacy Policy
                  </a>{" "}
                  e acconsento al trattamento dei miei dati personali per essere contattato dal team Moobe. *
                </label>
              </div>
              {errors.privacyAccepted && (
                <p className="text-sm text-red-500 ml-7">{errors.privacyAccepted}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-6 sm:mt-8">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-2xl h-12 sm:h-14 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                    Invio in corso...
                  </>
                ) : (
                  <>
                    <Calendar className="w-5 h-5 mr-3" />
                    Invia Richiesta Demo
                  </>
                )}
              </Button>
            </div>

            {/* Privacy Notice */}
            <p className="text-center text-xs text-gray-500 mt-4 leading-relaxed">
              I tuoi dati saranno trattati secondo la nostra Privacy Policy e utilizzati esclusivamente per organizzare la demo richiesta
            </p>
            </form>
          </div>

          {/* Bottom Decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-purple-500 to-yellow-400"></div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
