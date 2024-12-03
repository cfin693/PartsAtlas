import React, { createContext, useContext, useState, useCallback } from 'react';
import { Part } from '../types/parts';

interface PartsContextType {
  parts: Part[];
  addPart: (part: Part) => void;
  updatePart: (partId: string, updates: Partial<Part>) => void;
  removePart: (partId: string) => void;
  updateStock: (partId: string, quantity: number) => void;
}

const PartsContext = createContext<PartsContextType | undefined>(undefined);

export const usePartsContext = () => {
  const context = useContext(PartsContext);
  if (!context) {
    throw new Error('usePartsContext must be used within a PartsProvider');
  }
  return context;
};

export const PartsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [parts, setParts] = useState<Part[]>([
    {
      id: 'part-1',
      brand: 'STIHL',
      partNumber: 'ST-001',
      name: 'Air Filter',
      description: 'High-performance air filter for STIHL chainsaws',
      price: 29.99,
      cost: 15.00,
      stockLevel: 25,
      committed: 5,
      unavailable: 0,
      location: 'A1-B2',
      status: 'In Stock',
      reorderPoint: 10,
      supplier: 'STIHL'
    },
    {
      id: 'part-2',
      brand: 'Honda',
      partNumber: 'HON-002',
      name: 'Spark Plug',
      description: 'OEM spark plug for Honda lawn mowers',
      price: 8.99,
      cost: 3.50,
      stockLevel: 50,
      committed: 0,
      unavailable: 0,
      location: 'A2-B3',
      status: 'In Stock',
      reorderPoint: 15,
      supplier: 'Honda'
    }
  ]);

  const addPart = useCallback((newPart: Part) => {
    setParts(prevParts => {
      const updatedParts = [...prevParts, newPart];
      console.log('Added new part:', newPart);
      console.log('Updated parts list:', updatedParts);
      return updatedParts;
    });
  }, []);

  const updatePart = useCallback((partId: string, updates: Partial<Part>) => {
    setParts(prevParts =>
      prevParts.map(part =>
        part.id === partId ? { ...part, ...updates } : part
      )
    );
  }, []);

  const removePart = useCallback((partId: string) => {
    setParts(prevParts => prevParts.filter(part => part.id !== partId));
  }, []);

  const updateStock = useCallback((partId: string, quantity: number) => {
    setParts(prevParts =>
      prevParts.map(part =>
        part.id === partId
          ? {
              ...part,
              stockLevel: part.stockLevel + quantity,
              status: getStockStatus(part.stockLevel + quantity, part.reorderPoint)
            }
          : part
      )
    );
  }, []);

  const getStockStatus = (stockLevel: number, reorderPoint: number): Part['status'] => {
    if (stockLevel <= 0) return 'Out of Stock';
    if (stockLevel <= reorderPoint) return 'Low Stock';
    return 'In Stock';
  };

  const value = {
    parts,
    addPart,
    updatePart,
    removePart,
    updateStock
  };

  return (
    <PartsContext.Provider value={value}>
      {children}
    </PartsContext.Provider>
  );
};