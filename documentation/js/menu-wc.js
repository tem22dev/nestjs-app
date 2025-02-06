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
                    <a href="index.html" data-type="index-link">nestjs-app documentation</a>
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
                                            'data-bs-target="#controllers-links-module-AppModule-47322400a4c5dc8b6df7cc33eb155d31300ebab27cece3780289a67c820a305d4722227a1f497a02a5fec557c7e9c6783a68de0461bba1b8b9e02a5f101e339a"' : 'data-bs-target="#xs-controllers-links-module-AppModule-47322400a4c5dc8b6df7cc33eb155d31300ebab27cece3780289a67c820a305d4722227a1f497a02a5fec557c7e9c6783a68de0461bba1b8b9e02a5f101e339a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-47322400a4c5dc8b6df7cc33eb155d31300ebab27cece3780289a67c820a305d4722227a1f497a02a5fec557c7e9c6783a68de0461bba1b8b9e02a5f101e339a"' :
                                            'id="xs-controllers-links-module-AppModule-47322400a4c5dc8b6df7cc33eb155d31300ebab27cece3780289a67c820a305d4722227a1f497a02a5fec557c7e9c6783a68de0461bba1b8b9e02a5f101e339a"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-47322400a4c5dc8b6df7cc33eb155d31300ebab27cece3780289a67c820a305d4722227a1f497a02a5fec557c7e9c6783a68de0461bba1b8b9e02a5f101e339a"' : 'data-bs-target="#xs-injectables-links-module-AppModule-47322400a4c5dc8b6df7cc33eb155d31300ebab27cece3780289a67c820a305d4722227a1f497a02a5fec557c7e9c6783a68de0461bba1b8b9e02a5f101e339a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-47322400a4c5dc8b6df7cc33eb155d31300ebab27cece3780289a67c820a305d4722227a1f497a02a5fec557c7e9c6783a68de0461bba1b8b9e02a5f101e339a"' :
                                        'id="xs-injectables-links-module-AppModule-47322400a4c5dc8b6df7cc33eb155d31300ebab27cece3780289a67c820a305d4722227a1f497a02a5fec557c7e9c6783a68de0461bba1b8b9e02a5f101e339a"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-e71b9d850f16bd5eccf5bf4f46a36abd6ffee6b9ed4c9fd4277b6dd85d4cf323208d2d26ca4fea34ad6812ab04b7f632acd45cb324b29df7a42af13bc1bf911d"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-e71b9d850f16bd5eccf5bf4f46a36abd6ffee6b9ed4c9fd4277b6dd85d4cf323208d2d26ca4fea34ad6812ab04b7f632acd45cb324b29df7a42af13bc1bf911d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-e71b9d850f16bd5eccf5bf4f46a36abd6ffee6b9ed4c9fd4277b6dd85d4cf323208d2d26ca4fea34ad6812ab04b7f632acd45cb324b29df7a42af13bc1bf911d"' :
                                            'id="xs-controllers-links-module-AuthModule-e71b9d850f16bd5eccf5bf4f46a36abd6ffee6b9ed4c9fd4277b6dd85d4cf323208d2d26ca4fea34ad6812ab04b7f632acd45cb324b29df7a42af13bc1bf911d"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-e71b9d850f16bd5eccf5bf4f46a36abd6ffee6b9ed4c9fd4277b6dd85d4cf323208d2d26ca4fea34ad6812ab04b7f632acd45cb324b29df7a42af13bc1bf911d"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-e71b9d850f16bd5eccf5bf4f46a36abd6ffee6b9ed4c9fd4277b6dd85d4cf323208d2d26ca4fea34ad6812ab04b7f632acd45cb324b29df7a42af13bc1bf911d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-e71b9d850f16bd5eccf5bf4f46a36abd6ffee6b9ed4c9fd4277b6dd85d4cf323208d2d26ca4fea34ad6812ab04b7f632acd45cb324b29df7a42af13bc1bf911d"' :
                                        'id="xs-injectables-links-module-AuthModule-e71b9d850f16bd5eccf5bf4f46a36abd6ffee6b9ed4c9fd4277b6dd85d4cf323208d2d26ca4fea34ad6812ab04b7f632acd45cb324b29df7a42af13bc1bf911d"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CompaniesModule.html" data-type="entity-link" >CompaniesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CompaniesModule-eb4dcd9da24efd692ca685cb1b68883fe292bb1bc52ad83e572fbe783eba9c5dd31a5ce3e6a3ff199c9f9b9c82178d8e2d17bce404c5cccffc881e1d05b838de"' : 'data-bs-target="#xs-controllers-links-module-CompaniesModule-eb4dcd9da24efd692ca685cb1b68883fe292bb1bc52ad83e572fbe783eba9c5dd31a5ce3e6a3ff199c9f9b9c82178d8e2d17bce404c5cccffc881e1d05b838de"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CompaniesModule-eb4dcd9da24efd692ca685cb1b68883fe292bb1bc52ad83e572fbe783eba9c5dd31a5ce3e6a3ff199c9f9b9c82178d8e2d17bce404c5cccffc881e1d05b838de"' :
                                            'id="xs-controllers-links-module-CompaniesModule-eb4dcd9da24efd692ca685cb1b68883fe292bb1bc52ad83e572fbe783eba9c5dd31a5ce3e6a3ff199c9f9b9c82178d8e2d17bce404c5cccffc881e1d05b838de"' }>
                                            <li class="link">
                                                <a href="controllers/CompaniesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompaniesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CompaniesModule-eb4dcd9da24efd692ca685cb1b68883fe292bb1bc52ad83e572fbe783eba9c5dd31a5ce3e6a3ff199c9f9b9c82178d8e2d17bce404c5cccffc881e1d05b838de"' : 'data-bs-target="#xs-injectables-links-module-CompaniesModule-eb4dcd9da24efd692ca685cb1b68883fe292bb1bc52ad83e572fbe783eba9c5dd31a5ce3e6a3ff199c9f9b9c82178d8e2d17bce404c5cccffc881e1d05b838de"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CompaniesModule-eb4dcd9da24efd692ca685cb1b68883fe292bb1bc52ad83e572fbe783eba9c5dd31a5ce3e6a3ff199c9f9b9c82178d8e2d17bce404c5cccffc881e1d05b838de"' :
                                        'id="xs-injectables-links-module-CompaniesModule-eb4dcd9da24efd692ca685cb1b68883fe292bb1bc52ad83e572fbe783eba9c5dd31a5ce3e6a3ff199c9f9b9c82178d8e2d17bce404c5cccffc881e1d05b838de"' }>
                                        <li class="link">
                                            <a href="injectables/CompaniesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompaniesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabasesModule.html" data-type="entity-link" >DatabasesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DatabasesModule-2046b1514c9a315b31fb31fcd0ad45b771fb555b6b62a7520880ed786f2c079faaffe7b25182e578dfb14d0705ab846536f4f84592ac9d280a6377b85db06017"' : 'data-bs-target="#xs-controllers-links-module-DatabasesModule-2046b1514c9a315b31fb31fcd0ad45b771fb555b6b62a7520880ed786f2c079faaffe7b25182e578dfb14d0705ab846536f4f84592ac9d280a6377b85db06017"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DatabasesModule-2046b1514c9a315b31fb31fcd0ad45b771fb555b6b62a7520880ed786f2c079faaffe7b25182e578dfb14d0705ab846536f4f84592ac9d280a6377b85db06017"' :
                                            'id="xs-controllers-links-module-DatabasesModule-2046b1514c9a315b31fb31fcd0ad45b771fb555b6b62a7520880ed786f2c079faaffe7b25182e578dfb14d0705ab846536f4f84592ac9d280a6377b85db06017"' }>
                                            <li class="link">
                                                <a href="controllers/DatabasesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabasesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DatabasesModule-2046b1514c9a315b31fb31fcd0ad45b771fb555b6b62a7520880ed786f2c079faaffe7b25182e578dfb14d0705ab846536f4f84592ac9d280a6377b85db06017"' : 'data-bs-target="#xs-injectables-links-module-DatabasesModule-2046b1514c9a315b31fb31fcd0ad45b771fb555b6b62a7520880ed786f2c079faaffe7b25182e578dfb14d0705ab846536f4f84592ac9d280a6377b85db06017"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DatabasesModule-2046b1514c9a315b31fb31fcd0ad45b771fb555b6b62a7520880ed786f2c079faaffe7b25182e578dfb14d0705ab846536f4f84592ac9d280a6377b85db06017"' :
                                        'id="xs-injectables-links-module-DatabasesModule-2046b1514c9a315b31fb31fcd0ad45b771fb555b6b62a7520880ed786f2c079faaffe7b25182e578dfb14d0705ab846536f4f84592ac9d280a6377b85db06017"' }>
                                        <li class="link">
                                            <a href="injectables/DatabasesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabasesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesModule.html" data-type="entity-link" >FilesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FilesModule-b17d4a553b6ac6bd54fb51af81ab2f3579bf844873e50b414415dcc01209f642f83fa8083cfac8ff14a6f856ffe54dc034e4b90a19ed8d3c7922e19a5e1deef1"' : 'data-bs-target="#xs-controllers-links-module-FilesModule-b17d4a553b6ac6bd54fb51af81ab2f3579bf844873e50b414415dcc01209f642f83fa8083cfac8ff14a6f856ffe54dc034e4b90a19ed8d3c7922e19a5e1deef1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FilesModule-b17d4a553b6ac6bd54fb51af81ab2f3579bf844873e50b414415dcc01209f642f83fa8083cfac8ff14a6f856ffe54dc034e4b90a19ed8d3c7922e19a5e1deef1"' :
                                            'id="xs-controllers-links-module-FilesModule-b17d4a553b6ac6bd54fb51af81ab2f3579bf844873e50b414415dcc01209f642f83fa8083cfac8ff14a6f856ffe54dc034e4b90a19ed8d3c7922e19a5e1deef1"' }>
                                            <li class="link">
                                                <a href="controllers/FilesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FilesModule-b17d4a553b6ac6bd54fb51af81ab2f3579bf844873e50b414415dcc01209f642f83fa8083cfac8ff14a6f856ffe54dc034e4b90a19ed8d3c7922e19a5e1deef1"' : 'data-bs-target="#xs-injectables-links-module-FilesModule-b17d4a553b6ac6bd54fb51af81ab2f3579bf844873e50b414415dcc01209f642f83fa8083cfac8ff14a6f856ffe54dc034e4b90a19ed8d3c7922e19a5e1deef1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesModule-b17d4a553b6ac6bd54fb51af81ab2f3579bf844873e50b414415dcc01209f642f83fa8083cfac8ff14a6f856ffe54dc034e4b90a19ed8d3c7922e19a5e1deef1"' :
                                        'id="xs-injectables-links-module-FilesModule-b17d4a553b6ac6bd54fb51af81ab2f3579bf844873e50b414415dcc01209f642f83fa8083cfac8ff14a6f856ffe54dc034e4b90a19ed8d3c7922e19a5e1deef1"' }>
                                        <li class="link">
                                            <a href="injectables/FilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HealthModule-d1a9d4a406b23db10df33aa6617c5a25fc8e1d539ff781d3ae92e6eaf146fff94f17b33d80f2595b9749c0ee3de16de7e3ecd0dd49c1af32d55ce4b375af6eb3"' : 'data-bs-target="#xs-controllers-links-module-HealthModule-d1a9d4a406b23db10df33aa6617c5a25fc8e1d539ff781d3ae92e6eaf146fff94f17b33d80f2595b9749c0ee3de16de7e3ecd0dd49c1af32d55ce4b375af6eb3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-d1a9d4a406b23db10df33aa6617c5a25fc8e1d539ff781d3ae92e6eaf146fff94f17b33d80f2595b9749c0ee3de16de7e3ecd0dd49c1af32d55ce4b375af6eb3"' :
                                            'id="xs-controllers-links-module-HealthModule-d1a9d4a406b23db10df33aa6617c5a25fc8e1d539ff781d3ae92e6eaf146fff94f17b33d80f2595b9749c0ee3de16de7e3ecd0dd49c1af32d55ce4b375af6eb3"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/JobsModule.html" data-type="entity-link" >JobsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-JobsModule-71d4f5e48d12d636dbb8324ac70322cf2cf2042ba8cf18ae581ed3fc184a1d2adf6cd5e30a82a9e10fdff72e9c85750eeb44b57a17e504fa8dc352e10094bb66"' : 'data-bs-target="#xs-controllers-links-module-JobsModule-71d4f5e48d12d636dbb8324ac70322cf2cf2042ba8cf18ae581ed3fc184a1d2adf6cd5e30a82a9e10fdff72e9c85750eeb44b57a17e504fa8dc352e10094bb66"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-JobsModule-71d4f5e48d12d636dbb8324ac70322cf2cf2042ba8cf18ae581ed3fc184a1d2adf6cd5e30a82a9e10fdff72e9c85750eeb44b57a17e504fa8dc352e10094bb66"' :
                                            'id="xs-controllers-links-module-JobsModule-71d4f5e48d12d636dbb8324ac70322cf2cf2042ba8cf18ae581ed3fc184a1d2adf6cd5e30a82a9e10fdff72e9c85750eeb44b57a17e504fa8dc352e10094bb66"' }>
                                            <li class="link">
                                                <a href="controllers/JobsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-JobsModule-71d4f5e48d12d636dbb8324ac70322cf2cf2042ba8cf18ae581ed3fc184a1d2adf6cd5e30a82a9e10fdff72e9c85750eeb44b57a17e504fa8dc352e10094bb66"' : 'data-bs-target="#xs-injectables-links-module-JobsModule-71d4f5e48d12d636dbb8324ac70322cf2cf2042ba8cf18ae581ed3fc184a1d2adf6cd5e30a82a9e10fdff72e9c85750eeb44b57a17e504fa8dc352e10094bb66"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-JobsModule-71d4f5e48d12d636dbb8324ac70322cf2cf2042ba8cf18ae581ed3fc184a1d2adf6cd5e30a82a9e10fdff72e9c85750eeb44b57a17e504fa8dc352e10094bb66"' :
                                        'id="xs-injectables-links-module-JobsModule-71d4f5e48d12d636dbb8324ac70322cf2cf2042ba8cf18ae581ed3fc184a1d2adf6cd5e30a82a9e10fdff72e9c85750eeb44b57a17e504fa8dc352e10094bb66"' }>
                                        <li class="link">
                                            <a href="injectables/JobsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MailModule-b93863dd5dc8c6645b23544eebf09560a155829e78ffdcc28973ca908868c0f99f21fd31611a96d8144b3054c7958b1754fb6054f64893154e3c4502d094812b"' : 'data-bs-target="#xs-controllers-links-module-MailModule-b93863dd5dc8c6645b23544eebf09560a155829e78ffdcc28973ca908868c0f99f21fd31611a96d8144b3054c7958b1754fb6054f64893154e3c4502d094812b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MailModule-b93863dd5dc8c6645b23544eebf09560a155829e78ffdcc28973ca908868c0f99f21fd31611a96d8144b3054c7958b1754fb6054f64893154e3c4502d094812b"' :
                                            'id="xs-controllers-links-module-MailModule-b93863dd5dc8c6645b23544eebf09560a155829e78ffdcc28973ca908868c0f99f21fd31611a96d8144b3054c7958b1754fb6054f64893154e3c4502d094812b"' }>
                                            <li class="link">
                                                <a href="controllers/MailController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailModule-b93863dd5dc8c6645b23544eebf09560a155829e78ffdcc28973ca908868c0f99f21fd31611a96d8144b3054c7958b1754fb6054f64893154e3c4502d094812b"' : 'data-bs-target="#xs-injectables-links-module-MailModule-b93863dd5dc8c6645b23544eebf09560a155829e78ffdcc28973ca908868c0f99f21fd31611a96d8144b3054c7958b1754fb6054f64893154e3c4502d094812b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-b93863dd5dc8c6645b23544eebf09560a155829e78ffdcc28973ca908868c0f99f21fd31611a96d8144b3054c7958b1754fb6054f64893154e3c4502d094812b"' :
                                        'id="xs-injectables-links-module-MailModule-b93863dd5dc8c6645b23544eebf09560a155829e78ffdcc28973ca908868c0f99f21fd31611a96d8144b3054c7958b1754fb6054f64893154e3c4502d094812b"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PermissionsModule.html" data-type="entity-link" >PermissionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PermissionsModule-63f1465f115d2f2bdc61b19724b69dd555b473cbf9f2a53d7499dafdd31594e40f0183e5b5df600c78cc34a91ceac1502a99794732e410b86a9c9b038cc5f265"' : 'data-bs-target="#xs-controllers-links-module-PermissionsModule-63f1465f115d2f2bdc61b19724b69dd555b473cbf9f2a53d7499dafdd31594e40f0183e5b5df600c78cc34a91ceac1502a99794732e410b86a9c9b038cc5f265"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PermissionsModule-63f1465f115d2f2bdc61b19724b69dd555b473cbf9f2a53d7499dafdd31594e40f0183e5b5df600c78cc34a91ceac1502a99794732e410b86a9c9b038cc5f265"' :
                                            'id="xs-controllers-links-module-PermissionsModule-63f1465f115d2f2bdc61b19724b69dd555b473cbf9f2a53d7499dafdd31594e40f0183e5b5df600c78cc34a91ceac1502a99794732e410b86a9c9b038cc5f265"' }>
                                            <li class="link">
                                                <a href="controllers/PermissionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PermissionsModule-63f1465f115d2f2bdc61b19724b69dd555b473cbf9f2a53d7499dafdd31594e40f0183e5b5df600c78cc34a91ceac1502a99794732e410b86a9c9b038cc5f265"' : 'data-bs-target="#xs-injectables-links-module-PermissionsModule-63f1465f115d2f2bdc61b19724b69dd555b473cbf9f2a53d7499dafdd31594e40f0183e5b5df600c78cc34a91ceac1502a99794732e410b86a9c9b038cc5f265"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PermissionsModule-63f1465f115d2f2bdc61b19724b69dd555b473cbf9f2a53d7499dafdd31594e40f0183e5b5df600c78cc34a91ceac1502a99794732e410b86a9c9b038cc5f265"' :
                                        'id="xs-injectables-links-module-PermissionsModule-63f1465f115d2f2bdc61b19724b69dd555b473cbf9f2a53d7499dafdd31594e40f0183e5b5df600c78cc34a91ceac1502a99794732e410b86a9c9b038cc5f265"' }>
                                        <li class="link">
                                            <a href="injectables/PermissionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResumesModule.html" data-type="entity-link" >ResumesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ResumesModule-b6eb72130856f77c430f087f6631a721b65dc54b870f67d6e1f1d3fde70dcf5285278fee385bd99eab6cf4ca8ba193211fac0838611d84f08ec755887ac20fe5"' : 'data-bs-target="#xs-controllers-links-module-ResumesModule-b6eb72130856f77c430f087f6631a721b65dc54b870f67d6e1f1d3fde70dcf5285278fee385bd99eab6cf4ca8ba193211fac0838611d84f08ec755887ac20fe5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ResumesModule-b6eb72130856f77c430f087f6631a721b65dc54b870f67d6e1f1d3fde70dcf5285278fee385bd99eab6cf4ca8ba193211fac0838611d84f08ec755887ac20fe5"' :
                                            'id="xs-controllers-links-module-ResumesModule-b6eb72130856f77c430f087f6631a721b65dc54b870f67d6e1f1d3fde70dcf5285278fee385bd99eab6cf4ca8ba193211fac0838611d84f08ec755887ac20fe5"' }>
                                            <li class="link">
                                                <a href="controllers/ResumesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ResumesModule-b6eb72130856f77c430f087f6631a721b65dc54b870f67d6e1f1d3fde70dcf5285278fee385bd99eab6cf4ca8ba193211fac0838611d84f08ec755887ac20fe5"' : 'data-bs-target="#xs-injectables-links-module-ResumesModule-b6eb72130856f77c430f087f6631a721b65dc54b870f67d6e1f1d3fde70dcf5285278fee385bd99eab6cf4ca8ba193211fac0838611d84f08ec755887ac20fe5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ResumesModule-b6eb72130856f77c430f087f6631a721b65dc54b870f67d6e1f1d3fde70dcf5285278fee385bd99eab6cf4ca8ba193211fac0838611d84f08ec755887ac20fe5"' :
                                        'id="xs-injectables-links-module-ResumesModule-b6eb72130856f77c430f087f6631a721b65dc54b870f67d6e1f1d3fde70dcf5285278fee385bd99eab6cf4ca8ba193211fac0838611d84f08ec755887ac20fe5"' }>
                                        <li class="link">
                                            <a href="injectables/ResumesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RolesModule.html" data-type="entity-link" >RolesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RolesModule-93c6866af1f8719f4dc5fd77d104cdff624e5658f9eb0bc65d5c15ec99fbab7e42fa907baa1339451d55c9b8c1092ed064cf3e764cba1babb265722d079c9463"' : 'data-bs-target="#xs-controllers-links-module-RolesModule-93c6866af1f8719f4dc5fd77d104cdff624e5658f9eb0bc65d5c15ec99fbab7e42fa907baa1339451d55c9b8c1092ed064cf3e764cba1babb265722d079c9463"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RolesModule-93c6866af1f8719f4dc5fd77d104cdff624e5658f9eb0bc65d5c15ec99fbab7e42fa907baa1339451d55c9b8c1092ed064cf3e764cba1babb265722d079c9463"' :
                                            'id="xs-controllers-links-module-RolesModule-93c6866af1f8719f4dc5fd77d104cdff624e5658f9eb0bc65d5c15ec99fbab7e42fa907baa1339451d55c9b8c1092ed064cf3e764cba1babb265722d079c9463"' }>
                                            <li class="link">
                                                <a href="controllers/RolesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RolesModule-93c6866af1f8719f4dc5fd77d104cdff624e5658f9eb0bc65d5c15ec99fbab7e42fa907baa1339451d55c9b8c1092ed064cf3e764cba1babb265722d079c9463"' : 'data-bs-target="#xs-injectables-links-module-RolesModule-93c6866af1f8719f4dc5fd77d104cdff624e5658f9eb0bc65d5c15ec99fbab7e42fa907baa1339451d55c9b8c1092ed064cf3e764cba1babb265722d079c9463"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RolesModule-93c6866af1f8719f4dc5fd77d104cdff624e5658f9eb0bc65d5c15ec99fbab7e42fa907baa1339451d55c9b8c1092ed064cf3e764cba1babb265722d079c9463"' :
                                        'id="xs-injectables-links-module-RolesModule-93c6866af1f8719f4dc5fd77d104cdff624e5658f9eb0bc65d5c15ec99fbab7e42fa907baa1339451d55c9b8c1092ed064cf3e764cba1babb265722d079c9463"' }>
                                        <li class="link">
                                            <a href="injectables/RolesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SubscribersModule.html" data-type="entity-link" >SubscribersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SubscribersModule-0d65e1596e0399b59c3ec8bc34f4f638df967860ca8d37dc8bc1c63833321e859a37e1b210bd6853c676b533c586c214f2ac1773a831ef24d2b34cb6c5e13ed4"' : 'data-bs-target="#xs-controllers-links-module-SubscribersModule-0d65e1596e0399b59c3ec8bc34f4f638df967860ca8d37dc8bc1c63833321e859a37e1b210bd6853c676b533c586c214f2ac1773a831ef24d2b34cb6c5e13ed4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SubscribersModule-0d65e1596e0399b59c3ec8bc34f4f638df967860ca8d37dc8bc1c63833321e859a37e1b210bd6853c676b533c586c214f2ac1773a831ef24d2b34cb6c5e13ed4"' :
                                            'id="xs-controllers-links-module-SubscribersModule-0d65e1596e0399b59c3ec8bc34f4f638df967860ca8d37dc8bc1c63833321e859a37e1b210bd6853c676b533c586c214f2ac1773a831ef24d2b34cb6c5e13ed4"' }>
                                            <li class="link">
                                                <a href="controllers/SubscribersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SubscribersModule-0d65e1596e0399b59c3ec8bc34f4f638df967860ca8d37dc8bc1c63833321e859a37e1b210bd6853c676b533c586c214f2ac1773a831ef24d2b34cb6c5e13ed4"' : 'data-bs-target="#xs-injectables-links-module-SubscribersModule-0d65e1596e0399b59c3ec8bc34f4f638df967860ca8d37dc8bc1c63833321e859a37e1b210bd6853c676b533c586c214f2ac1773a831ef24d2b34cb6c5e13ed4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SubscribersModule-0d65e1596e0399b59c3ec8bc34f4f638df967860ca8d37dc8bc1c63833321e859a37e1b210bd6853c676b533c586c214f2ac1773a831ef24d2b34cb6c5e13ed4"' :
                                        'id="xs-injectables-links-module-SubscribersModule-0d65e1596e0399b59c3ec8bc34f4f638df967860ca8d37dc8bc1c63833321e859a37e1b210bd6853c676b533c586c214f2ac1773a831ef24d2b34cb6c5e13ed4"' }>
                                        <li class="link">
                                            <a href="injectables/SubscribersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-6376a9f4e7c3093582ab372241701d3e7c404caa99b64341312f4a4827388d323e65b1388a86f7d16dd4b9f9d9c692f81144997a7d5694a3a6222ddd045611fc"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-6376a9f4e7c3093582ab372241701d3e7c404caa99b64341312f4a4827388d323e65b1388a86f7d16dd4b9f9d9c692f81144997a7d5694a3a6222ddd045611fc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-6376a9f4e7c3093582ab372241701d3e7c404caa99b64341312f4a4827388d323e65b1388a86f7d16dd4b9f9d9c692f81144997a7d5694a3a6222ddd045611fc"' :
                                            'id="xs-controllers-links-module-UsersModule-6376a9f4e7c3093582ab372241701d3e7c404caa99b64341312f4a4827388d323e65b1388a86f7d16dd4b9f9d9c692f81144997a7d5694a3a6222ddd045611fc"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-6376a9f4e7c3093582ab372241701d3e7c404caa99b64341312f4a4827388d323e65b1388a86f7d16dd4b9f9d9c692f81144997a7d5694a3a6222ddd045611fc"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-6376a9f4e7c3093582ab372241701d3e7c404caa99b64341312f4a4827388d323e65b1388a86f7d16dd4b9f9d9c692f81144997a7d5694a3a6222ddd045611fc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-6376a9f4e7c3093582ab372241701d3e7c404caa99b64341312f4a4827388d323e65b1388a86f7d16dd4b9f9d9c692f81144997a7d5694a3a6222ddd045611fc"' :
                                        'id="xs-injectables-links-module-UsersModule-6376a9f4e7c3093582ab372241701d3e7c404caa99b64341312f4a4827388d323e65b1388a86f7d16dd4b9f9d9c692f81144997a7d5694a3a6222ddd045611fc"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
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
                                <a href="classes/Company.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company-1.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company-2.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCompanyDto.html" data-type="entity-link" >CreateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFileDto.html" data-type="entity-link" >CreateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateJobDto.html" data-type="entity-link" >CreateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePermissionDto.html" data-type="entity-link" >CreatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateResumeDto.html" data-type="entity-link" >CreateResumeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoleDto.html" data-type="entity-link" >CreateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSubscriberDto.html" data-type="entity-link" >CreateSubscriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserCvDto.html" data-type="entity-link" >CreateUserCvDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/File.html" data-type="entity-link" >File</a>
                            </li>
                            <li class="link">
                                <a href="classes/History.html" data-type="entity-link" >History</a>
                            </li>
                            <li class="link">
                                <a href="classes/Job.html" data-type="entity-link" >Job</a>
                            </li>
                            <li class="link">
                                <a href="classes/Permission.html" data-type="entity-link" >Permission</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterUserDto.html" data-type="entity-link" >RegisterUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Resume.html" data-type="entity-link" >Resume</a>
                            </li>
                            <li class="link">
                                <a href="classes/Role.html" data-type="entity-link" >Role</a>
                            </li>
                            <li class="link">
                                <a href="classes/Subscriber.html" data-type="entity-link" >Subscriber</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCompanyDto.html" data-type="entity-link" >UpdateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatedBy.html" data-type="entity-link" >UpdatedBy</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFileDto.html" data-type="entity-link" >UpdateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateJobDto.html" data-type="entity-link" >UpdateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePermissionDto.html" data-type="entity-link" >UpdatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateResumeDto.html" data-type="entity-link" >UpdateResumeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRoleDto.html" data-type="entity-link" >UpdateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSubscriberDto.html" data-type="entity-link" >UpdateSubscriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserLoginDto.html" data-type="entity-link" >UserLoginDto</a>
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
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MulterConfigService.html" data-type="entity-link" >MulterConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransformInterceptor.html" data-type="entity-link" >TransformInterceptor</a>
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
                                <a href="guards/TestGuard.html" data-type="entity-link" >TestGuard</a>
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
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link" >Response</a>
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
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
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