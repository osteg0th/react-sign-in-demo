FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/Api/SignInDemo.Api/SignInDemo.Api.csproj", "src/Api/SignInDemo.Api/"]
RUN dotnet restore "src/Api/SignInDemo.Api/SignInDemo.Api.csproj"
COPY . .
WORKDIR "/src/src/Api/SignInDemo.Api"
RUN dotnet build "SignInDemo.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "SignInDemo.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SignInDemo.Api.dll"]
