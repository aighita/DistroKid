import { useState } from 'react';
import type { PlatformRecord } from '@/lib/openapi/models';
import { getAllPlatforms, getPlatformById, addPlatform } from '@/services/platform';

export function usePlatform() {
    const [platforms, setPlatforms] = useState<PlatformRecord[]>([]);

    const fetchAllPlatforms = async () => {
        try {
            const data = await getAllPlatforms();
            setPlatforms(data);
        } catch (error) {
            console.error('Error fetching platforms:', error);
        }
    };

    // const fetchPlatformById = async (id: string) => {
    //     try {
    //         const platform = await getPlatformById(id);
    //         return platform;
    //     } catch (error) {
    //         console.error(`Error fetching platform with id ${id}:`, error);
    //         return null;
    //     }
    // };

    // const createPlatform = async (name: string, url: string) => {
    //     try {
    //         const newPlatform = await addPlatform(name, url);
    //         setPlatforms((prev) => [...prev, newPlatform]);
    //         return newPlatform;
    //     } catch (error) {
    //         console.error('Error creating platform:', error);
    //         return null;
    //     }
    // };

    return {
        platforms,
        fetchAllPlatforms,
    };
}

