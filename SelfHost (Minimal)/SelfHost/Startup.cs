﻿using Owin;
using SelfHost.Config;
using Thinktecture.IdentityServer.Core.Configuration;
using Thinktecture.IdentityServer.Host.Config;

namespace SelfHost
{
    internal class Startup
    {
        public void Configuration(IAppBuilder appBuilder)
        {
            var factory = InMemoryFactory.Create(
                users:   Users.Get(), 
                clients: Clients.Get(), 
                scopes:  Scopes.Get());

            var options = new IdentityServerOptions
            {
                IssuerUri = "https://idsrv3.com",
                SiteName = "Thinktecture IdentityServer3 (self host)",

                SigningCertificate = Certificate.Get(),
                RequireSsl = false,
                Factory = factory,
                CorsPolicy = CorsPolicy.AllowAll,
                 
            };

      
            appBuilder.UseIdentityServer(options);
        }
    }
}