
export const RedsysURLs = {
    Testing: {
        Rest: {
            IniciaPeticion: 'https://sis-t.redsys.es:25443/sis/rest/iniciaPeticionREST',
            TrataPeticion: 'https://sis-t.redsys.es:25443/sis/rest/trataPeticionREST',
        },
        Redirect: {
            RealizarPago: 'https://sis-t.redsys.es:25443/sis/realizarPago',
        }
    },
    Production: {
        Rest: {
            IniciaPeticion: 'https://sis.redsys.es/sis/rest/iniciaPeticionREST',
            TrataPeticion: 'https://sis.redsys.es/sis/rest/trataPeticionREST',
        },
        Redirect: {
            RealizarPago: 'https://sis.redsys.es/sis/realizarPago',
        }
    }
}