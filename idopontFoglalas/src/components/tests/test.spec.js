import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import IdopontPage from '@/views/IdopontPage.vue'
import { createPinia, setActivePinia } from 'pinia'
import {useidopontStore} from "@/stores/idopont.js";

describe('IdopontPage', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('Tartalom ellenőrzése', () => {
        const wrapper = mount(IdopontPage)
        expect(wrapper.text()).toContain('Időpont Foglalás')
    })

    it('Kezdetben nincsenek időpontok', () =>{
        const idopont = useidopontStore()
        expect(idopont.idopontok.length).toBe(0)
    })

    it('időpontok fetchelése', async () => {
        const idopont = useidopontStore()
        await idopont.getIdopontok()
        expect(idopont.idopontok.length).toBeGreaterThan(0)
    })

    it('időpont foglalása', async () => {
        const idopont = useidopontStore()
        await idopont.bookIdopont('Teszt Elek', '+36301234567', 'Hétfő 10:00')
        expect(idopont.idopontok.length).toBeGreaterThan(0)
        expect(idopont.idopontok).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    nev: 'Teszt Elek',
                    telszam: '+36301234567',
                    nap: 'Hétfő',
                    ora: '10:00'
                })
            ])
        )
        // Cleanup: remove the test data
        await idopont.removeIdopont('Teszt Elek', '+36301234567', 'Hétfő 10:00')
    })

})