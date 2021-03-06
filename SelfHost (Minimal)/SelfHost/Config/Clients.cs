﻿using System;
using System.Collections.Generic;
using System.Security.Claims;
using Thinktecture.IdentityServer.Core;
using Thinktecture.IdentityServer.Core.Models;

namespace Thinktecture.IdentityServer.Host.Config
{
    public class Clients
    {
        public static List<Client> Get()
        {
            return new List<Client> {
                
                new Client{

                    ClientName = "AngularJS Client",
                    Enabled = true,
                    ClientId = "implicitclient",
                    ClientSecrets = new List<ClientSecret>{
                        new ClientSecret("secret".Sha256())
                    },

                    Flow = Flows.Implicit,
                    RequireConsent = true,
                    AllowRememberConsent = true,

                    RedirectUris = new List<string> {
                        // JavaScript client
                        "http://192.168.178.48:59380/callback.html",
                        "http://192.168.178.48:59380/modal.html",
                        "http://localhost:59380/callback.html",
                        "http://localhost:59380/modal.html",
                        "http://localhost:4400/index.html",
                        "http://localhost:4400/callback",
                        "http://localhost/callback",
                        "http://localhost:49564/authComplete.html",
                    },

                    PostLogoutRedirectUris = new List<string>{
                        "http://localhost:59380/index.html"
                    },

                    ScopeRestrictions = new List<string> {
                        Constants.StandardScopes.OpenId,
                        Constants.StandardScopes.Profile,
                        Constants.StandardScopes.Email,
                        "webapi"
                    },

                    AccessTokenType = AccessTokenType.Jwt,

                    IdentityTokenLifetime = 360,
                    AccessTokenLifetime = 360
                }
            };
        }
    }
}