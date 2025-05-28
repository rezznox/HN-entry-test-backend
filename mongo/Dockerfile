# Use the official MongoDB base image
FROM mongo:7.0

# Optional: Set environment variables (can be overridden at runtime)
ENV MONGO_INITDB_ROOT_USERNAME=$MONGO_INITDB_ROOT_USERNAME
ENV MONGO_INITDB_ROOT_PASSWORD=$MONGO_INITDB_ROOT_PASSWORD

# Expose the default MongoDB port
EXPOSE 27017

# Use the default entrypoint provided by the image
CMD ["mongod"]
