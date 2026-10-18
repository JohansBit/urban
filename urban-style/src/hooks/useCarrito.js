import { useState, useEffect } from "react";


export function useCarrito(){
    const [carrito, setCarrito] = useState(() => {
        const guardado = localStorage.getItem('urban_carrito');
        return guardado ? JSON.parse(guardado) : [];
    });
    const [mostrarCarrito, setMostrarCarrito] = useState(false);

    useEffect(() => {
        localStorage.setItem('urban_carrito', JSON.stringify(carrito));
    }, [carrito]);

    const agregarProducto = (producto) =>  {
        setCarrito(prev => {
        const existe = prev.find(item => item.id === producto.id);
        if (existe){
            return prev.map(item =>
                item.id === producto.id ? {...item, cantidad: item.cantidad + 1} : item
            );
        }
        return [...prev, {...producto, cantidad:1}];
        });
    };

    const eliminarProducto = (id) =>{
        setCarrito(prev => prev.filter(item => item.id !== id));
    };

    const vaciarCarrito = () => setCarrito([]);

    const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    return{
        carrito,
        mostrarCarrito,
        setMostrarCarrito,
        agregarProducto,
        eliminarProducto,
        vaciarCarrito,
        totalUnidades
    };
}