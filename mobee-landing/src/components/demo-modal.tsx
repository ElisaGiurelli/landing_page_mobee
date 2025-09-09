"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Calendar, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    cognome: "",
    email: "",
    azienda: "",
    ruolo: "",
    telefono: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

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
        toast.success("Richiesta inviata con successo! Ti contatteremo entro 24 ore.", {
          duration: 4000,
          position: "top-center",
        });
        
        // Reset form
        setFormData({
          nome: "",
          cognome: "",
          email: "",
          azienda: "",
          ruolo: "",
          telefono: "",
        });
        
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
        }, 2000);
        
      } else {
        toast.error(result.message || "Errore nell'invio della richiesta. Riprova più tardi.");
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
      });
      setErrors({});
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-w-[95vw] p-0 overflow-hidden bg-white rounded-2xl border-0 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 text-white">
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors disabled:opacity-50"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-6 h-6 text-yellow-400" />
              <DialogTitle className="text-2xl font-bold">
                Prenota la tua Demo Personalizzata
              </DialogTitle>
            </div>
            
            <DialogDescription className="text-purple-100">
              Compila il form e ti contatteremo entro 24 ore
            </DialogDescription>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome *
                </label>
                <Input
                  id="nome"
                  name="nome"
                  type="text"
                  value={formData.nome}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`${errors.nome ? "border-red-500" : "border-gray-300"} focus:ring-purple-500 focus:border-purple-500`}
                  placeholder="Il tuo nome"
                />
                {errors.nome && (
                  <p className="mt-1 text-sm text-red-500">{errors.nome}</p>
                )}
              </div>

              <div>
                <label htmlFor="cognome" className="block text-sm font-medium text-gray-700 mb-1">
                  Cognome *
                </label>
                <Input
                  id="cognome"
                  name="cognome"
                  type="text"
                  value={formData.cognome}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`${errors.cognome ? "border-red-500" : "border-gray-300"} focus:ring-purple-500 focus:border-purple-500`}
                  placeholder="Il tuo cognome"
                />
                {errors.cognome && (
                  <p className="mt-1 text-sm text-red-500">{errors.cognome}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
                className={`${errors.email ? "border-red-500" : "border-gray-300"} focus:ring-purple-500 focus:border-purple-500`}
                placeholder="nome@azienda.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="azienda" className="block text-sm font-medium text-gray-700 mb-1">
                  Azienda *
                </label>
                <Input
                  id="azienda"
                  name="azienda"
                  type="text"
                  value={formData.azienda}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`${errors.azienda ? "border-red-500" : "border-gray-300"} focus:ring-purple-500 focus:border-purple-500`}
                  placeholder="Nome dell'azienda"
                />
                {errors.azienda && (
                  <p className="mt-1 text-sm text-red-500">{errors.azienda}</p>
                )}
              </div>

              <div>
                <label htmlFor="ruolo" className="block text-sm font-medium text-gray-700 mb-1">
                  Ruolo *
                </label>
                <Input
                  id="ruolo"
                  name="ruolo"
                  type="text"
                  value={formData.ruolo}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`${errors.ruolo ? "border-red-500" : "border-gray-300"} focus:ring-purple-500 focus:border-purple-500`}
                  placeholder="Es. HR Manager, CEO, etc."
                />
                {errors.ruolo && (
                  <p className="mt-1 text-sm text-red-500">{errors.ruolo}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                Telefono
              </label>
              <Input
                id="telefono"
                name="telefono"
                type="tel"
                value={formData.telefono}
                onChange={handleInputChange}
                disabled={isLoading}
                className="border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                placeholder="+39 000 000 0000 (opzionale)"
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-full font-semibold text-lg transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Invio in corso...
                  </>
                ) : (
                  <>
                    <Calendar className="w-5 h-5 mr-2" />
                    Invia Richiesta Demo
                  </>
                )}
              </Button>
            </div>

            <div className="text-center pt-2">
              <p className="text-xs text-gray-500">
                Cliccando su &ldquo;Invia Richiesta Demo&rdquo; accetti di essere contattato dal team Mobee
              </p>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}