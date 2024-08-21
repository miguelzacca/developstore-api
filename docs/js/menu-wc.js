'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">developstore-api documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-63a2904c450a3dce1377ca3caae46cca160c2bd4e8a45c5971f796ea23af916d50b5ae812b6440735e4859293a5e7952400d87d2c3558c92c454ebdb8a3ff2e3"' : 'data-bs-target="#xs-injectables-links-module-AppModule-63a2904c450a3dce1377ca3caae46cca160c2bd4e8a45c5971f796ea23af916d50b5ae812b6440735e4859293a5e7952400d87d2c3558c92c454ebdb8a3ff2e3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-63a2904c450a3dce1377ca3caae46cca160c2bd4e8a45c5971f796ea23af916d50b5ae812b6440735e4859293a5e7952400d87d2c3558c92c454ebdb8a3ff2e3"' :
                                        'id="xs-injectables-links-module-AppModule-63a2904c450a3dce1377ca3caae46cca160c2bd4e8a45c5971f796ea23af916d50b5ae812b6440735e4859293a5e7952400d87d2c3558c92c454ebdb8a3ff2e3"' }>
                                        <li class="link">
                                            <a href="injectables/PopulateProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PopulateProductsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RmUnverifiedUsers.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RmUnverifiedUsers</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-8d90cf4addab9541627ca5efc9676e09c023ed97cf33d48194fbc25bec5f0b71975cfbbfb30043f5ffd4aff792377148a656eb9411dfc3947d86ec43ba5f6ccf"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-8d90cf4addab9541627ca5efc9676e09c023ed97cf33d48194fbc25bec5f0b71975cfbbfb30043f5ffd4aff792377148a656eb9411dfc3947d86ec43ba5f6ccf"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-8d90cf4addab9541627ca5efc9676e09c023ed97cf33d48194fbc25bec5f0b71975cfbbfb30043f5ffd4aff792377148a656eb9411dfc3947d86ec43ba5f6ccf"' :
                                            'id="xs-controllers-links-module-AuthModule-8d90cf4addab9541627ca5efc9676e09c023ed97cf33d48194fbc25bec5f0b71975cfbbfb30043f5ffd4aff792377148a656eb9411dfc3947d86ec43ba5f6ccf"' }>
                                            <li class="link">
                                                <a href="controllers/AuthControllers.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthControllers</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-8d90cf4addab9541627ca5efc9676e09c023ed97cf33d48194fbc25bec5f0b71975cfbbfb30043f5ffd4aff792377148a656eb9411dfc3947d86ec43ba5f6ccf"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-8d90cf4addab9541627ca5efc9676e09c023ed97cf33d48194fbc25bec5f0b71975cfbbfb30043f5ffd4aff792377148a656eb9411dfc3947d86ec43ba5f6ccf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-8d90cf4addab9541627ca5efc9676e09c023ed97cf33d48194fbc25bec5f0b71975cfbbfb30043f5ffd4aff792377148a656eb9411dfc3947d86ec43ba5f6ccf"' :
                                        'id="xs-injectables-links-module-AuthModule-8d90cf4addab9541627ca5efc9676e09c023ed97cf33d48194fbc25bec5f0b71975cfbbfb30043f5ffd4aff792377148a656eb9411dfc3947d86ec43ba5f6ccf"' }>
                                        <li class="link">
                                            <a href="injectables/AuthServices.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthServices</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EmailVerifyUseCase.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailVerifyUseCase</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LoginUseCase.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginUseCase</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PasswdRecoveryUseCase.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PasswdRecoveryUseCase</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RegisterUseCase.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterUseCase</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommonModule.html" data-type="entity-link" >CommonModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CommonModule-05fc156491a4154a86afaeaf99409e876f760c9fafdf56f9768ec35fe943290bf7e714c1974a63ef665215b55eaf5497dd0bae13e43a8999806bfc1e053eec67"' : 'data-bs-target="#xs-injectables-links-module-CommonModule-05fc156491a4154a86afaeaf99409e876f760c9fafdf56f9768ec35fe943290bf7e714c1974a63ef665215b55eaf5497dd0bae13e43a8999806bfc1e053eec67"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CommonModule-05fc156491a4154a86afaeaf99409e876f760c9fafdf56f9768ec35fe943290bf7e714c1974a63ef665215b55eaf5497dd0bae13e43a8999806bfc1e053eec67"' :
                                        'id="xs-injectables-links-module-CommonModule-05fc156491a4154a86afaeaf99409e876f760c9fafdf56f9768ec35fe943290bf7e714c1974a63ef665215b55eaf5497dd0bae13e43a8999806bfc1e053eec67"' }>
                                        <li class="link">
                                            <a href="injectables/CommonServices.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommonServices</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProductsModule.html" data-type="entity-link" >ProductsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProductsModule-3ab8f490a427a9147e2007ac2a6d51586743534b14f69266ca156cd991312d6939e2f6422aaf63e928618b1128ac017664448d89927af3044529a1de27b8959e"' : 'data-bs-target="#xs-controllers-links-module-ProductsModule-3ab8f490a427a9147e2007ac2a6d51586743534b14f69266ca156cd991312d6939e2f6422aaf63e928618b1128ac017664448d89927af3044529a1de27b8959e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductsModule-3ab8f490a427a9147e2007ac2a6d51586743534b14f69266ca156cd991312d6939e2f6422aaf63e928618b1128ac017664448d89927af3044529a1de27b8959e"' :
                                            'id="xs-controllers-links-module-ProductsModule-3ab8f490a427a9147e2007ac2a6d51586743534b14f69266ca156cd991312d6939e2f6422aaf63e928618b1128ac017664448d89927af3044529a1de27b8959e"' }>
                                            <li class="link">
                                                <a href="controllers/ProductsControllers.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsControllers</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductsModule-3ab8f490a427a9147e2007ac2a6d51586743534b14f69266ca156cd991312d6939e2f6422aaf63e928618b1128ac017664448d89927af3044529a1de27b8959e"' : 'data-bs-target="#xs-injectables-links-module-ProductsModule-3ab8f490a427a9147e2007ac2a6d51586743534b14f69266ca156cd991312d6939e2f6422aaf63e928618b1128ac017664448d89927af3044529a1de27b8959e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductsModule-3ab8f490a427a9147e2007ac2a6d51586743534b14f69266ca156cd991312d6939e2f6422aaf63e928618b1128ac017664448d89927af3044529a1de27b8959e"' :
                                        'id="xs-injectables-links-module-ProductsModule-3ab8f490a427a9147e2007ac2a6d51586743534b14f69266ca156cd991312d6939e2f6422aaf63e928618b1128ac017664448d89927af3044529a1de27b8959e"' }>
                                        <li class="link">
                                            <a href="injectables/GetProductsUseCase.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GetProductsUseCase</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductsRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductsServices.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsServices</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-6079c083e9012a23e2e1547b579a13bfa3a91d59584665031a22c431369917492fe60133f54aa861845a356659f914e817aa996ae3efde21402b699fb5f151f0"' : 'data-bs-target="#xs-controllers-links-module-UserModule-6079c083e9012a23e2e1547b579a13bfa3a91d59584665031a22c431369917492fe60133f54aa861845a356659f914e817aa996ae3efde21402b699fb5f151f0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-6079c083e9012a23e2e1547b579a13bfa3a91d59584665031a22c431369917492fe60133f54aa861845a356659f914e817aa996ae3efde21402b699fb5f151f0"' :
                                            'id="xs-controllers-links-module-UserModule-6079c083e9012a23e2e1547b579a13bfa3a91d59584665031a22c431369917492fe60133f54aa861845a356659f914e817aa996ae3efde21402b699fb5f151f0"' }>
                                            <li class="link">
                                                <a href="controllers/UserControllers.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserControllers</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-6079c083e9012a23e2e1547b579a13bfa3a91d59584665031a22c431369917492fe60133f54aa861845a356659f914e817aa996ae3efde21402b699fb5f151f0"' : 'data-bs-target="#xs-injectables-links-module-UserModule-6079c083e9012a23e2e1547b579a13bfa3a91d59584665031a22c431369917492fe60133f54aa861845a356659f914e817aa996ae3efde21402b699fb5f151f0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-6079c083e9012a23e2e1547b579a13bfa3a91d59584665031a22c431369917492fe60133f54aa861845a356659f914e817aa996ae3efde21402b699fb5f151f0"' :
                                        'id="xs-injectables-links-module-UserModule-6079c083e9012a23e2e1547b579a13bfa3a91d59584665031a22c431369917492fe60133f54aa861845a356659f914e817aa996ae3efde21402b699fb5f151f0"' }>
                                        <li class="link">
                                            <a href="injectables/ChangePasswdUseCase.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChangePasswdUseCase</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DeleteUserUseCase.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeleteUserUseCase</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FavoriteRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FavoriteRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GetFavoritesUseCase.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GetFavoritesUseCase</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GetUserUseCase.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GetUserUseCase</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ToggleFavoriteUseCase.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToggleFavoriteUseCase</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRepository</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AuthControllers.html" data-type="entity-link" >AuthControllers</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProductsControllers.html" data-type="entity-link" >ProductsControllers</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserControllers.html" data-type="entity-link" >UserControllers</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ChangePasswdBody.html" data-type="entity-link" >ChangePasswdBody</a>
                            </li>
                            <li class="link">
                                <a href="classes/Favorites.html" data-type="entity-link" >Favorites</a>
                            </li>
                            <li class="link">
                                <a href="classes/HandleError.html" data-type="entity-link" >HandleError</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpExceptionFilter.html" data-type="entity-link" >HttpExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginBody.html" data-type="entity-link" >LoginBody</a>
                            </li>
                            <li class="link">
                                <a href="classes/Products.html" data-type="entity-link" >Products</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterBody.html" data-type="entity-link" >RegisterBody</a>
                            </li>
                            <li class="link">
                                <a href="classes/ToggleFavoriteBody.html" data-type="entity-link" >ToggleFavoriteBody</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserServices.html" data-type="entity-link" >UserServices</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthServices.html" data-type="entity-link" >AuthServices</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChangePasswdUseCase.html" data-type="entity-link" >ChangePasswdUseCase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommonServices.html" data-type="entity-link" >CommonServices</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeleteUserUseCase.html" data-type="entity-link" >DeleteUserUseCase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmailVerifyUseCase.html" data-type="entity-link" >EmailVerifyUseCase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FavoriteRepository.html" data-type="entity-link" >FavoriteRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GetFavoritesUseCase.html" data-type="entity-link" >GetFavoritesUseCase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GetProductsUseCase.html" data-type="entity-link" >GetProductsUseCase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GetUserUseCase.html" data-type="entity-link" >GetUserUseCase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoginUseCase.html" data-type="entity-link" >LoginUseCase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PasswdRecoveryUseCase.html" data-type="entity-link" >PasswdRecoveryUseCase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PopulateProductsService.html" data-type="entity-link" >PopulateProductsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductsRepository.html" data-type="entity-link" >ProductsRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductsServices.html" data-type="entity-link" >ProductsServices</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RegisterUseCase.html" data-type="entity-link" >RegisterUseCase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RmUnverifiedUsers.html" data-type="entity-link" >RmUnverifiedUsers</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ToggleFavoriteUseCase.html" data-type="entity-link" >ToggleFavoriteUseCase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserRepository.html" data-type="entity-link" >UserRepository</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/isLoggedIn.html" data-type="entity-link" >isLoggedIn</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Env.html" data-type="entity-link" >Env</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFavoritesRepository.html" data-type="entity-link" >IFavoritesRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUserRepository.html" data-type="entity-link" >IUserRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductEl.html" data-type="entity-link" >ProductEl</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductRepositoryInterface.html" data-type="entity-link" >ProductRepositoryInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegisterUserCaseProps.html" data-type="entity-link" >RegisterUserCaseProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SendEmailProps.html" data-type="entity-link" >SendEmailProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdateField.html" data-type="entity-link" >UpdateField</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});