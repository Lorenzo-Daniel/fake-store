# Fake Store

## Under construction
[Deploy][Deploy]

[deploy]:https://precious-caramel-78198c.netlify.app/


### Descripción:

### FAKE STORE es un e-commerce web app ficticia desarrollada con React JS usando create-react-app

### Para manejar el Almacenamiento Global de la app implemento :  
- @reduxjs/toolkit
- react-redux
- redux-persist
- redux-thunk

### Para crear la interfaz implemento: MUI 

### Para autenticación de usario implemento: firebase/auth   

### Para base de datos implemento : firebase/firestore


## Navegación e interaccion de usuario

### * La interfaz sera diferente dependiendo de si el usuario esta autenticado o no, ofreciendo distintas posibilidades de navegación


## Navegación sin usuario autenticado


- ' / ' : cuando la aplicación se monta nos ofrece una interfaz de bienvenida con la opcion de navegar a _'/store'_

- _'/store/:params'_ : 
  - El componente se monta por defecto en _'store/all-products_ y renderiza 100 _ProductCard_.
  - Los datos provienen de un llamado a _'https://dummyjson.com/products?limit=100'_ (fake-api).
  - Seleccionando cualquiera de las categorias de producto que ofrece la lista de categorias de _TemporaryDrawer_ en _Navbar_, podremos modificar el _param_ de la url y renderizar solo los productos que correspondan a la categoria seleccionada
  - Cada _ProductCard_ tendra dos botones : 
    - _add to cart/remove from cart_ : agrega o elimina el producto del carrito de compras.
    - _learn more_ : navega a _'/product-description/:params'_.

<br>

- _'/product-description/:params'_ :  
  - Renderiza los detalles del producto seleccionado, recive un _identificador_ de producto como _params_.

<br>

- _'/cart'_ : 
  - Si el usuario agrega productos al carrito de compras; renderiza un detalle de los productos agregados.   
  - Permite al usuario aumentar o reducir la cantidad de unidades de cada producto seleccionado.
  - Permite eliminar un producto del carrito.
  - Permite eliminar todos los productos del carrito. 

<br>

- _'sign-in'_ : 
  - Renderiza un formulario de logueo con usario y contraseña _(firebase/auth)_.
  - Validaciones tipicas de formulario.
  - _'error: el usuario no exite'_ :  renderiza un dialogo aunciando al usuario sobre el error y ofrece la posibilidad de navegar a '/sign-up'.
  - _'error: contraseña incorrecta'_ : renderiza un dialogo aunciando al usuario sobre el error y sugiere verificar los datos
  - _success_: Renderiza un dialogo aunciando al usuario sobre el logueo exitoso y navega a '/store/all-products'.
  - Provee un link hacia '/recover-password' si el usuario tiene problemas con su contraseña.

<br>

- '/recover-password' : 
    - Renderiza un formulario de modificacion de contraseña (firebase/auth)
    - Validaciones tipicas de formulario
    - _'error: el usuario ya existe'_ : renderiza un dialogo advirtiendo al usuario del error.
    - _success_ : renderiza un dialogo anunciando el proceso exitoso y sugiere verificar su email inbox para modificar la contraseña mediante el link que se  le ha enviado.

<br>

- '/sign-up' : 
    - renderiza un formulario de registro, los datos recogidos seran guardados en base de datos (firebase/firestore)
    - Validaciones tipicas de formulario
    - _'error: el usuario ya existe'_ : si el usuario ingresado ya existe renderiza un dialogo advirtiendo al usuario el error y sugiere verificar si no no ha realizado antes un registro con ese usuario.
    -success: renderiza un dialogo aunciando al ususario el registro exitoso y navega hacia '/store/all-products

<br>

- 'user-messages' : renderiza un _hard-coded_ message de bienvenida a FAKE STORE


## Navegación con usuario autenticado 

### * Todas las navegaciones posibles para ususario no autenticado mas las que se enumeran a continuacion.














### Deploy : [Aquí](https://coruscating-figolla-d9c79f.netlify.app/)

![Vinoteca - Google Chrome 2022-10-14 14-21-25](https://user-images.githubusercontent.com/103971385/195919276-b838614c-c749-417f-9063-a011c7aadc15.gif)

### Características del desafío:

### User story/brief:

- Un usuario debe poder ingresar, navegar por los productos e ir a sus detalles.
- Desde el detalle se debe poder ver la descripción, foto y precio e ingresarlo al carrito.
- Una vez que el carrito tenga al menos un producto, se deberá visualizar un listado compacto de la orden con el precio total.
- Al ingresar su nombre, apellido, teléfono e e-mail (ingresándolo dos veces para corroborar que sea correcto), debe activarse el botón de ‘realizar compra’.
- Al clickear ‘realizar compra’ debe guardarse en la base de datos una orden que tenga todos los productos, la fecha y dar feedback del número de orden.

### Componentes sugeridos:


- Navbar
- Menu
- CartWidget
- ListItem
- ItemList
- ItemDetail
  - ItemQuantitySelector
  -Description
  -AddItemButton
- Checkout
  -Brief (detalle de compra)

---

### Requisitos:

- Inicio: Al momento de ingresar a la app en la ruta base ‘/’

  - Visualizar -como mínimo- un set de productos disponibles para la compra.
  - Contar con algún acceso visible a la vista de carrito que debe alojarse en el route /cart.
  - Acceder a un menú desplegable que contendrá las categorías. Al clickear en una, debe navegar a la lista de productos de la misma mediante un route      /categories/:categoryId. Éste invocará la misma vista que el home, pero visualizando solamente productos de esa
categoría.

- Flow: Al clickear un ítem del listado debe navegar a la ruta /item/:id, donde id es el id del item (generado por firebase), y ver la descripción del producto ( foto, precio, selector de cantidad). Si se ingresa a /item/:id y el producto no existe en firebase, debemos responder un mensaje adecuado que indique algo relacionado a que el producto no existe.

- Firebase:
  - Implementar al menos dos colecciones:
    - Items: catálogo completo
    - Link para foto (puede almacenarse de modo estático en la página en una subruta /images/:itemid)
    - Precio unitario
    - Descripción (sólo se ve en detalle)
    - Categoria (id a mano para versión estática, o id de firebase para versión dinámica -opcional-)
- orders : las órdenes generadas, que deben incluir los productos, descripciones y los precios al momento de la compra.
  -Las órdenes deben poder tener items surtidos, cada uno con su cantidad. Por ejemplo: remeras x 2 y gorra x 1
  -id, items, fecha, estado ( por defecto en ‘generada’)
- El cart debe ser accesible durante toda la experiencia y tener una indicación de la cantidad de items incluidos agregados (ej. si hay un ítem con dos unidades y un    ítem con una unidad, debe decir ‘tres’).
  - Checkout mínimo:
  - Items con sus cantidades
  - Total de la orden
  - Input para nombre, apellido y teléfono
  - Input para email y lógica de repetir el email 2 veces.
- Finalizada la orden, debo recibir mi order id con el id del objeto de firebase.
- La navegabilidad debe ocurrir utilizando el router, y no href’s o location.

---

### Construido con :

- Html
- css
- React JS

---

### Luego de clonar el repositorio, posiciónate en la carpeta VinotecaReact y ejecuta _npm install_ para instalar las dependencias:

- "bootstrap": "^5.2.0",
- "firebase": "^9.10.0",
- "react": "^18.2.0",
- "react-dom": "^18.2.0",
- "react-router-dom": "^6.3.0",
- "react-scripts": "^2.1.3",
- "sweetalert2": "^11.4.29",
- "sweetalert2-react-content": "^5.0.3",

---

### Desarrollado por _Daniel Lorenzo_






