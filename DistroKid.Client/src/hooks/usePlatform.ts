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

    
    
    
    
    
    
    
    
    

    
    
    
    
    
    
    
    
    
    

    return {
        platforms,
        fetchAllPlatforms,
    };
}

