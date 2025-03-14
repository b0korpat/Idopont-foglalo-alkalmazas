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

})