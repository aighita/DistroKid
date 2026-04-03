FROM node:20-alpine AS build-node
WORKDIR /src
COPY ["DistroKid.Client/package*.json", "DistroKid.Client/"]
RUN cd DistroKid.Client && npm install
COPY ["DistroKid.Client/", "DistroKid.Client/"]
RUN cd DistroKid.Client && npm run build

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build-dotnet
WORKDIR /src
COPY ["DistroKid.slnx", "."]
COPY ["DistroKid.Api/DistroKid.Api.csproj", "DistroKid.Api/"]
COPY ["DistroKid.Database/DistroKid.Database.csproj", "DistroKid.Database/"]
COPY ["DistroKid.Infrastructure/DistroKid.Infrastructure.csproj", "DistroKid.Infrastructure/"]
COPY ["DistroKid.Services/DistroKid.Services.csproj", "DistroKid.Services/"]
COPY ["DistroKid.Fixtures/DistroKid.Fixtures.csproj", "DistroKid.Fixtures/"]
RUN dotnet restore "DistroKid.Api/DistroKid.Api.csproj"
COPY . .
WORKDIR "/src/DistroKid.Api"
RUN dotnet build "DistroKid.Api.csproj" -c Release -o /app/build -p:SkipNextJsBuild=true

FROM build-dotnet AS publish
RUN dotnet publish "DistroKid.Api.csproj" -c Release -o /app/publish -p:SkipNextJsBuild=true
# Copy exported Next.js app to wwwroot folder inside the published API
COPY --from=build-node /src/DistroKid.Client/out /app/publish/wwwroot

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
EXPOSE 5001

COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DistroKid.Api.dll"]
