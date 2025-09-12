import type { BreadcrumbItem } from '@/types';
import { editor } from '@/routes';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import React, { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Editor',
        href: editor().url
    }
];

const Editor = () => {
    const { data, setData, post, processing, errors } = useForm({
        titolo: '',
        sottotitolo: '',
        immagine: null as File | null
    });

    const [anteprima, setAnteprima] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('immagine', file);

        if (file) {
            const url = URL.createObjectURL(file);
            setAnteprima(url);
        } else {
            setAnteprima(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(editor().url);
    };

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editor" />

            <div className="space-y-6">
                {/* ANTEPRIMA HERO SECTION */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-4 border-b bg-gray-50">
                        <h2 className="text-lg font-semibold text-gray-800">Anteprima Hero Section</h2>
                    </div>

                    <div className="relative">
                        <div
                            className="relative h-64 md:h-80 lg:h-96 bg-gradient-to-r from-gray-200 to-gray-300 flex items-end justify-start overflow-hidden"
                            style={{
                                backgroundImage: anteprima ? `url(${anteprima})` : undefined,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}
                        >

                            {/* Contenuto della hero */}
                            <div className="relative z-10 text-left p-6 max-w-lg">
                                <h1 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-2 drop-shadow-lg ${
                                    anteprima ? 'text-white' : 'text-gray-600'
                                }`}>
                                    {data.titolo || 'Il tuo titolo apparirà qui'}
                                </h1>
                                <p className={`text-sm md:text-base lg:text-lg drop-shadow-md ${
                                    anteprima ? 'text-gray-100' : 'text-gray-500'
                                }`}>
                                    {data.sottotitolo || 'Il tuo sottotitolo apparirà qui'}
                                </p>
                            </div>

                            {/* Placeholder */}
                            {!anteprima && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-sm">Carica un'immagine per vedere l'anteprima</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>


                {/* FORM DI EDITING */}
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-black">Configura Hero Section</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="titolo" className="block text-sm font-medium text-gray-700 mb-2">
                                Titolo Principale
                            </label>
                            <input
                                type="text"
                                id="titolo"
                                className="text-black w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Inserisci il titolo principale..."
                                value={data.titolo}
                                onChange={(e) => setData('titolo', e.target.value)}
                            />
                            {errors.titolo && <p className="text-red-500 text-sm mt-1">{errors.titolo}</p>}
                        </div>

                        <div>
                            <label htmlFor="sottotitolo" className="block text-sm font-medium text-gray-700 mb-2">
                                Sottotitolo
                            </label>
                            <input
                                id="sottotitolo"
                                className="text-black w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Inserisci il sottotitolo o una breve descrizione..."
                                value={data.sottotitolo}
                                onChange={(e) => setData('sottotitolo', e.target.value)}
                            />
                            {errors.sottotitolo && <p className="text-red-500 text-sm mt-1">{errors.sottotitolo}</p>}
                        </div>

                        <div>
                            <label htmlFor="immagine" className="block text-sm font-medium text-gray-700 mb-2">
                                Immagine di Sfondo
                            </label>
                            <input
                                type="file"
                                id="immagine"
                                accept="image/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                            <div className="flex items-center space-x-3">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 border border-gray-300 flex items-center transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4V5h12v10z" clipRule="evenodd" />
                                        <path d="M8 7a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                    </svg>
                                    {anteprima ? 'Cambia Immagine' : 'Carica Immagine'}
                                </button>

                                {anteprima && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setAnteprima(null);
                                            setData('immagine', null);
                                            if (fileInputRef.current) {
                                                fileInputRef.current.value = '';
                                            }
                                        }}
                                        className="px-4 py-3 text-red-600 hover:text-red-800 transition-colors"
                                    >
                                        Rimuovi
                                    </button>
                                )}
                            </div>
                            {errors.immagine && <p className="text-red-500 text-sm mt-1">{errors.immagine}</p>}
                        </div>

                        <div className="pt-4 border-t">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                            >
                                {processing ? 'Salvataggio in corso...' : 'Salva Hero Section'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default Editor;
