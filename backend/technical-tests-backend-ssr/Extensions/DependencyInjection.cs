using technical_tests_backend_ssr.Profiles;

namespace technical_tests_backend_ssr.Extensions
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddProfiles(this IServiceCollection services)
        {
            services.AddAutoMapper(cfg =>
            {
                cfg.AddProfile<ApiProfile>();
            });

            return services;
        }
    }
}
